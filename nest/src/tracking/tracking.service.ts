import { Injectable, HttpException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';
import {
  getAddressData,
  getTokensMetadata,
  checkWalletAddress,
} from '../common/utils';

@Injectable()
export class TrackingService {
  constructor(private prisma: PrismaService) {}

  async findUserAdresses(userId: string) {
    try {
      const addresses = await this.prisma.trackedAddresses.findMany({
        where: {
          userId,
        },
        include: {
          supportedNetworks: true,
          currencies: true,
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });

      if (!addresses || addresses.length === 0) {
        return { addresses: [] };
      }
      const addressesData = await Promise.all(
        addresses.map(async (address) => {
          delete Object.assign(address, {
            ['SupportedNetwork']: address['supportedNetworks'],
          })['supportedNetworks'];
          delete Object.assign(address, {
            ['Currency']: address['currencies'],
          })['currencies'];

          const addressStats = await getAddressData(address);
          return addressStats;
        }),
      );

      const metadata = await getTokensMetadata(addressesData);
      return { addresses: addressesData, metadata: metadata };
    } catch (error) {
      throw new HttpException({ message: error.message }, 400);
    }
  }

  findNetworks() {
    return this.prisma.supportedNetworks.findMany();
  }

  async create(createTrackingDto: CreateTrackingDto, userId: string) {
    const checkAddress = await checkWalletAddress(
      createTrackingDto.network.code,
      createTrackingDto.address,
    );
    if (!checkAddress) {
      throw new HttpException({ message: 'Address is not valid' }, 400);
    }

    try {
      const trackingAddress = await this.prisma.trackedAddresses.create({
        data: {
          userId,
          name: createTrackingDto?.name || null,
          networkId: createTrackingDto.network.id,
          address: createTrackingDto.address,
          targetAmount: createTrackingDto.target
            ? parseFloat(createTrackingDto.target.toFixed(5))
            : null,
          currencyId: createTrackingDto.currencyId,
        },
      });
      return trackingAddress;
    } catch (err) {
      throw new HttpException(err.message, 400);
    }
  }

  async update(updateTrackingDto: UpdateTrackingDto, userId: string) {
    const trackingAddress = await this.prisma.trackedAddresses
      .findFirstOrThrow({
        where: {
          id: updateTrackingDto.id,
          userId,
        },
        include: {
          supportedNetworks: true,
          currencies: true,
        },
      })
      .catch(() => {
        throw new HttpException(
          'Tracked address not found to update address or user does not have access to that address',
          400,
        );
      });

    const updateObj = {
      name: trackingAddress.name,
      networkId: updateTrackingDto.network?.id || trackingAddress.networkId,
      targetAmount: updateTrackingDto.target
        ? parseFloat(updateTrackingDto.target.toFixed(5))
        : trackingAddress.targetAmount,
      currencyId: updateTrackingDto.currency?.id || trackingAddress.currencyId,
      address: '',
    };

    if (
      updateTrackingDto.name != undefined &&
      typeof updateTrackingDto.name == 'string'
    ) {
      updateObj.name = updateTrackingDto.name;
    }

    if (updateTrackingDto.address || updateTrackingDto.network) {
      const addressToCheck =
        updateTrackingDto.address || trackingAddress.address;
      const network =
        updateTrackingDto.network || trackingAddress.supportedNetworks;

      const checkAddress = await checkWalletAddress(
        network.code,
        addressToCheck,
      );
      if (!checkAddress) {
        throw new HttpException(
          {
            message: 'Either selected network or address is not valid',
          },
          400,
        );
      }
      updateObj.address = addressToCheck;
      updateObj.networkId = network.id;
    }

    const updateAddress = await this.prisma.trackedAddresses.update({
      where: {
        id: updateTrackingDto.id,
      },
      data: updateObj,
    });
    return updateAddress;
  }

  async remove(id: number, userId: string) {
    try {
      const deletedAddress = await this.prisma.trackedAddresses.delete({
        where: {
          id: id,
          userId,
        },
      });
      return deletedAddress;
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
        },
        400,
      );
    }
  }
}

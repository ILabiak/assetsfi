import { Injectable, HttpException } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { PrismaService } from '../prisma/prisma.service';
import {
  calculateDonationsStats,
  parseFoundationAddresses,
  getCurrencyRate,
} from '../common/utils';

@Injectable()
export class DonationsService {
  constructor(private prisma: PrismaService) {}

  async userDonations(userId: string) {
    const donations = await this.prisma.donations.findMany({
      where: {
        userId,
      },
      include: {
        foundations: true,
        currencies: true,
      },
      orderBy: {
        date: 'desc',
      },
    });

    if (!donations || donations.length === 0) {
      throw new HttpException('Donations Not Found', 400);
    }

    const donationsData = await Promise.all(
      donations.map(async (donation) => {
        delete Object.assign(donation, {
          ['Foundation']: donation['foundations'],
        })['foundations'];
        delete Object.assign(donation, {
          ['Currency']: donation['currencies'],
        })['currencies'];

        return donation;
      }),
    );
    const result = calculateDonationsStats(donationsData);
    return result;
  }

  async foundationWallets() {
    return await parseFoundationAddresses();
  }

  foundationsList() {
    return this.prisma.foundations.findMany();
  }

  async create(createDonationDto: CreateDonationDto, userId: string) {
    let currencyRate = 1;
    if (createDonationDto.currency.code != 'usd') {
      currencyRate = await getCurrencyRate(
        createDonationDto.currency.code,
        'usd',
      );
    }
    if (currencyRate < 0) {
      throw new HttpException(
        {
          message: 'Error while fetching currency rate',
        },
        400,
      );
    }
    try {
      const donation = await this.prisma.donations.create({
        data: {
          userId: userId,
          foundationId: createDonationDto.foundationId,
          amount: createDonationDto.amount,
          date: createDonationDto.date,
          description: createDonationDto.description,
          currencyId: createDonationDto.currency.id,
          amountInUsd: parseFloat(
            (createDonationDto.amount / currencyRate).toFixed(5),
          ),
        },
      });
      return donation;
    } catch (err) {
      throw new HttpException(err.message, 400);
    }
  }

  async update(updateDonationDto: UpdateDonationDto, userId: string) {
    const donation = await this.prisma.donations
      .findFirstOrThrow({
        where: {
          id: updateDonationDto.id,
          userId,
        },
        include: {
          currencies: true,
        },
      })
      .catch((err) => {
        throw new HttpException(err.message, 400);
      });

    let currencyRate, amountInUsd;
    if (updateDonationDto?.currency || updateDonationDto.amount) {
      const currency = updateDonationDto?.currency || donation['currencies'];
      if (currency.code != 'usd') {
        currencyRate = await getCurrencyRate(currency.code, 'usd');
      } else {
        currencyRate = 1;
      }
      const amount = updateDonationDto.amount || donation.amount;
      amountInUsd = parseFloat((amount / currencyRate).toFixed(5));

      if (currencyRate < 0) {
        throw new HttpException(
          {
            message: 'Error while fetching currency rate',
          },
          400,
        );
      }
    }
    const foundationId =
      updateDonationDto.foundationId != undefined ||
      updateDonationDto.foundationId == null
        ? updateDonationDto.foundationId
        : donation.foundationId;
    const updateDonation = await this.prisma.donations.update({
      where: {
        id: updateDonationDto.id,
      },
      data: {
        foundationId: foundationId,
        amount: updateDonationDto.amount || donation.amount,
        date: updateDonationDto.date || donation.date,
        description: updateDonationDto.description || donation.description,
        currencyId: updateDonationDto?.currency?.id || donation.currencyId,
        amountInUsd: amountInUsd || donation.amountInUsd,
      },
    });
    return updateDonation;
  }

  async remove(id: number, userId: string) {
    try {
      const deletedDonation = await this.prisma.donations.delete({
        where: {
          id,
          userId,
        },
      });
      return deletedDonation;
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

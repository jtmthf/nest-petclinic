import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Res,
  UseFilters,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { VIEWS_OWNER_CREATE_OR_UPDATE_FORM } from './constants';
import { InvalidOwnerFilter } from './invalid-owner.filter';
import { Owner } from './owner.entity';
import { OwnerRepository } from './owner.repository';
import { Like } from 'typeorm';

@Controller('owners')
export class OwnerController {
  constructor(private readonly owners: OwnerRepository) {}

  @Get('new')
  @Render(VIEWS_OWNER_CREATE_OR_UPDATE_FORM)
  initCreationForm() {
    return {
      owner: new Owner(),
    };
  }

  @Post('new')
  @UseFilters(InvalidOwnerFilter)
  async processCreationForm(@Body() owner: Owner, @Res() response: Response) {
    await this.owners.save(owner);
    response.redirect('/owners/' + owner.id);
  }

  @Get('find')
  @Render('owners/findOwners')
  initFindForm() {
    return {
      owner: new Owner(),
    };
  }

  @Get()
  async processFindForm(@Body() owner: Owner, @Res() response: Response) {
    if (!owner.lastName) {
      owner.lastName = '';
    }

    const results = await this.owners.find({
      where: { lastName: Like(`${owner.lastName}%`) },
      relations: ['pets'],
    });
    if (results.length === 0) {
      // no owners found
      return response.render('owners/findOwners');
    } else if (results.length === 1) {
      // 1 owner found
      const [owner] = results;
      return response.redirect('/owners/' + owner.id);
    } else {
      // multiple owners found
      return response.render('owners/ownersList', { selections: results });
    }
  }

  @Get(':ownerId/edit')
  @Render(VIEWS_OWNER_CREATE_OR_UPDATE_FORM)
  async initUpdateOwnerForm(@Param('ownerId', ParseIntPipe) ownerId: number) {
    const owner = await this.owners.findOneOrFail(ownerId);
    return {
      owner,
    };
  }

  @Post(':ownerId/edit')
  @UseFilters(InvalidOwnerFilter)
  async processUpdateOwnerForm(
    @Body() owner: Owner,
    @Param('ownerId', ParseIntPipe) ownerId: number,
    @Res() response: Response,
  ) {
    owner.id = ownerId;
    await this.owners.save(owner);
    response.redirect('/owners/' + owner.id);
  }

  @Get(':ownerId')
  @Render('owners/ownerDetails')
  async showOwner(@Param('ownerId', ParseIntPipe) ownerId: number) {
    const owner = await this.owners.findOneOrFail(ownerId);
    return {
      owner,
    };
  }
}

import SequelizeRepository from '../../database/repositories/sequelizeRepository';
import AuditLogRepository from '../../database/repositories/auditLogRepository';
import lodash from 'lodash';
import SequelizeFilterUtils from '../../database/utils/sequelizeFilterUtils';
import Error404 from '../../errors/Error404';
import Sequelize from 'sequelize';
import { IRepositoryOptions } from './IRepositoryOptions';

const Op = Sequelize.Op;

class TreatmentRepository {

  static async create(data, options: IRepositoryOptions) {
    const currentUser = SequelizeRepository.getCurrentUser(
      options,
    );

    const tenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const record = await options.database.treatment.create(
      {
        ...lodash.pick(data, [
          'rTTreatmentIntent',
          'rTModality',
          'rTDoseGY',
          'rTConcurrentChemo',
          'rTFractions',
          'rTCompletedConcChemoSTD',
          'rTCompletedSTD',
          'rTEndDate',
          'rTDuration',
          'rTStartedAfter',
          'cTIntent',
          'cTDrug',
          'cTTotalCyclesGiven',
          'cTCompletedSTD',
          'cTEndDate',
          'cTDuration',
          'cTStartedAfter',
          'deathDate',
          'daysRTEndUntillDeath',          
          'importHash',
        ]),
        patientIDId: data.patientID || null,
        tenantId: tenant.id,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      {
        transaction,
      },
    );

    
  

  
    await this._createAuditLog(
      AuditLogRepository.CREATE,
      record,
      data,
      options,
    );

    return this.findById(record.id, options);
  }

  static async update(id, data, options: IRepositoryOptions) {
    const currentUser = SequelizeRepository.getCurrentUser(
      options,
    );

    const transaction = SequelizeRepository.getTransaction(
      options,
    );


    const currentTenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    let record = await options.database.treatment.findOne(      
      {
        where: {
          id,
          tenantId: currentTenant.id,
        },
        transaction,
      },
    );

    if (!record) {
      throw new Error404();
    }

    record = await record.update(
      {
        ...lodash.pick(data, [
          'rTTreatmentIntent',
          'rTModality',
          'rTDoseGY',
          'rTConcurrentChemo',
          'rTFractions',
          'rTCompletedConcChemoSTD',
          'rTCompletedSTD',
          'rTEndDate',
          'rTDuration',
          'rTStartedAfter',
          'cTIntent',
          'cTDrug',
          'cTTotalCyclesGiven',
          'cTCompletedSTD',
          'cTEndDate',
          'cTDuration',
          'cTStartedAfter',
          'deathDate',
          'daysRTEndUntillDeath',          
          'importHash',
        ]),
        patientIDId: data.patientID || null,
        updatedById: currentUser.id,
      },
      {
        transaction,
      },
    );





    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      record,
      data,
      options,
    );

    return this.findById(record.id, options);
  }

  static async destroy(id, options: IRepositoryOptions) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const currentTenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    let record = await options.database.treatment.findOne(
      {
        where: {
          id,
          tenantId: currentTenant.id,
        },
        transaction,
      },
    );

    if (!record) {
      throw new Error404();
    }

    await record.destroy({
      transaction,
    });

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      record,
      record,
      options,
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const include = [
      {
        model: options.database.patients,
        as: 'patientID',
      },
    ];

    const currentTenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    const record = await options.database.treatment.findOne(
      {
        where: {
          id,
          tenantId: currentTenant.id,
        },
        include,
        transaction,
      },
    );

    if (!record) {
      throw new Error404();
    }

    return this._fillWithRelationsAndFiles(record, options);
  }

  static async filterIdInTenant(
    id,
    options: IRepositoryOptions,
  ) {
    return lodash.get(
      await this.filterIdsInTenant([id], options),
      '[0]',
      null,
    );
  }

  static async filterIdsInTenant(
    ids,
    options: IRepositoryOptions,
  ) {
    if (!ids || !ids.length) {
      return [];
    }

    const currentTenant =
      SequelizeRepository.getCurrentTenant(options);

    const where = {
      id: {
        [Op.in]: ids,
      },
      tenantId: currentTenant.id,
    };

    const records = await options.database.treatment.findAll(
      {
        attributes: ['id'],
        where,
      },
    );

    return records.map((record) => record.id);
  }

  static async count(filter, options: IRepositoryOptions) {
    const transaction = SequelizeRepository.getTransaction(
      options,
    );

    const tenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    return options.database.treatment.count(
      {
        where: {
          ...filter,
          tenantId: tenant.id,
        },
        transaction,
      },
    );
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
  ) {
    const tenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    let whereAnd: Array<any> = [];
    let include = [
      {
        model: options.database.patients,
        as: 'patientID',
      },      
    ];

    whereAnd.push({
      tenantId: tenant.id,
    });

    if (filter) {
      if (filter.id) {
        whereAnd.push({
          ['id']: SequelizeFilterUtils.uuid(filter.id),
        });
      }

      if (filter.patientID) {
        whereAnd.push({
          ['patientIDId']: SequelizeFilterUtils.uuid(
            filter.patientID,
          ),
        });
      }

      if (filter.rTTreatmentIntent) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'treatment',
            'rTTreatmentIntent',
            filter.rTTreatmentIntent,
          ),
        );
      }

      if (filter.rTDoseGY) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'treatment',
            'rTDoseGY',
            filter.rTDoseGY,
          ),
        );
      }

      if (filter.rTConcurrentChemo) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'treatment',
            'rTConcurrentChemo',
            filter.rTConcurrentChemo,
          ),
        );
      }

      if (filter.rTFractions) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'treatment',
            'rTFractions',
            filter.rTFractions,
          ),
        );
      }

      if (filter.rTCompletedConcChemoSTD) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'treatment',
            'rTCompletedConcChemoSTD',
            filter.rTCompletedConcChemoSTD,
          ),
        );
      }

      if (filter.rTCompletedSTD) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'treatment',
            'rTCompletedSTD',
            filter.rTCompletedSTD,
          ),
        );
      }

      if (filter.rTEndDateRange) {
        const [start, end] = filter.rTEndDateRange;

        if (start !== undefined && start !== null && start !== '') {
          whereAnd.push({
            rTEndDate: {
              [Op.gte]: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          whereAnd.push({
            rTEndDate: {
              [Op.lte]: end,
            },
          });
        }
      }

      if (filter.rTDuration) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'treatment',
            'rTDuration',
            filter.rTDuration,
          ),
        );
      }

      if (filter.rTStartedAfterRange) {
        const [start, end] = filter.rTStartedAfterRange;

        if (start !== undefined && start !== null && start !== '') {
          whereAnd.push({
            rTStartedAfter: {
              [Op.gte]: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          whereAnd.push({
            rTStartedAfter: {
              [Op.lte]: end,
            },
          });
        }
      }

      if (filter.cTIntent) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'treatment',
            'cTIntent',
            filter.cTIntent,
          ),
        );
      }

      if (filter.cTDrug) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'treatment',
            'cTDrug',
            filter.cTDrug,
          ),
        );
      }

      if (filter.cTTotalCyclesGiven) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'treatment',
            'cTTotalCyclesGiven',
            filter.cTTotalCyclesGiven,
          ),
        );
      }

      if (filter.cTCompletedSTD) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'treatment',
            'cTCompletedSTD',
            filter.cTCompletedSTD,
          ),
        );
      }

      if (filter.cTEndDateRange) {
        const [start, end] = filter.cTEndDateRange;

        if (start !== undefined && start !== null && start !== '') {
          whereAnd.push({
            cTEndDate: {
              [Op.gte]: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          whereAnd.push({
            cTEndDate: {
              [Op.lte]: end,
            },
          });
        }
      }

      if (filter.cTDuration) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'treatment',
            'cTDuration',
            filter.cTDuration,
          ),
        );
      }

      if (filter.cTStartedAfter) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'treatment',
            'cTStartedAfter',
            filter.cTStartedAfter,
          ),
        );
      }

      if (filter.deathDateRange) {
        const [start, end] = filter.deathDateRange;

        if (start !== undefined && start !== null && start !== '') {
          whereAnd.push({
            deathDate: {
              [Op.gte]: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          whereAnd.push({
            deathDate: {
              [Op.lte]: end,
            },
          });
        }
      }

      if (filter.daysRTEndUntillDeath) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'treatment',
            'daysRTEndUntillDeath',
            filter.daysRTEndUntillDeath,
          ),
        );
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (
          start !== undefined &&
          start !== null &&
          start !== ''
        ) {
          whereAnd.push({
            ['createdAt']: {
              [Op.gte]: start,
            },
          });
        }

        if (
          end !== undefined &&
          end !== null &&
          end !== ''
        ) {
          whereAnd.push({
            ['createdAt']: {
              [Op.lte]: end,
            },
          });
        }
      }
    }

    const where = { [Op.and]: whereAnd };

    let {
      rows,
      count,
    } = await options.database.treatment.findAndCountAll({
      where,
      include,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      order: orderBy
        ? [orderBy.split('_')]
        : [['createdAt', 'DESC']],
      transaction: SequelizeRepository.getTransaction(
        options,
      ),
    });

    rows = await this._fillWithRelationsAndFilesForRows(
      rows,
      options,
    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit, options: IRepositoryOptions) {
    const tenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    let whereAnd: Array<any> = [{
      tenantId: tenant.id,
    }];

    if (query) {
      whereAnd.push({
        [Op.or]: [
          { ['id']: SequelizeFilterUtils.uuid(query) },
          {
            [Op.and]: SequelizeFilterUtils.ilikeIncludes(
              'treatment',
              'rTTreatmentIntent',
              query,
            ),
          },
        ],
      });
    }

    const where = { [Op.and]: whereAnd };

    const records = await options.database.treatment.findAll(
      {
        attributes: ['id', 'rTTreatmentIntent'],
        where,
        limit: limit ? Number(limit) : undefined,
        order: [['rTTreatmentIntent', 'ASC']],
      },
    );

    return records.map((record) => ({
      id: record.id,
      label: record.rTTreatmentIntent,
    }));
  }

  static async _createAuditLog(
    action,
    record,
    data,
    options: IRepositoryOptions,
  ) {
    let values = {};

    if (data) {
      values = {
        ...record.get({ plain: true }),

      };
    }

    await AuditLogRepository.log(
      {
        entityName: 'treatment',
        entityId: record.id,
        action,
        values,
      },
      options,
    );
  }

  static async _fillWithRelationsAndFilesForRows(
    rows,
    options: IRepositoryOptions,
  ) {
    if (!rows) {
      return rows;
    }

    return Promise.all(
      rows.map((record) =>
        this._fillWithRelationsAndFiles(record, options),
      ),
    );
  }

  static async _fillWithRelationsAndFiles(record, options: IRepositoryOptions) {
    if (!record) {
      return record;
    }

    const output = record.get({ plain: true });

    const transaction = SequelizeRepository.getTransaction(
      options,
    );



    return output;
  }
}

export default TreatmentRepository;

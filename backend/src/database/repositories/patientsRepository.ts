import SequelizeRepository from '../../database/repositories/sequelizeRepository';
import AuditLogRepository from '../../database/repositories/auditLogRepository';
import lodash from 'lodash';
import SequelizeFilterUtils from '../../database/utils/sequelizeFilterUtils';
import Error404 from '../../errors/Error404';
import Sequelize from 'sequelize';
import { IRepositoryOptions } from './IRepositoryOptions';

const Op = Sequelize.Op;

class PatientsRepository {

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

    const record = await options.database.patients.create(
      {
        ...lodash.pick(data, [
          'patientID',
          'name',
          'dob',
          'sex',
          'ageAtPositive',
          'ageAtLastStatusUpdate',
          'state',
          'occupation',
          'status',
          'statusDate',
          'hospital',
          'smoking',
          'alcohol',
          'diabetes',
          'hypertension',
          'otherCancer',
          'familyCancer',
          'eNT1stVisit',
          'onco1stVisit',
          'stage',
          'ethnicity',
          'npc',
          'firstPositiveBiopsyInHPE',
          'firstPositiveBiopsyDate',
          'wHOGrade',
          'surgeriesCount',
          'criticalLevel',
          'recurrence',          
          'importHash',
        ]),

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

    let record = await options.database.patients.findOne(      
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
          'patientID',
          'name',
          'dob',
          'sex',
          'ageAtPositive',
          'ageAtLastStatusUpdate',
          'state',
          'occupation',
          'status',
          'statusDate',
          'hospital',
          'smoking',
          'alcohol',
          'diabetes',
          'hypertension',
          'otherCancer',
          'familyCancer',
          'eNT1stVisit',
          'onco1stVisit',
          'stage',
          'ethnicity',
          'npc',
          'firstPositiveBiopsyInHPE',
          'firstPositiveBiopsyDate',
          'wHOGrade',
          'surgeriesCount',
          'criticalLevel',
          'recurrence',          
          'importHash',
        ]),

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

    let record = await options.database.patients.findOne(
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

    ];

    const currentTenant = SequelizeRepository.getCurrentTenant(
      options,
    );

    const record = await options.database.patients.findOne(
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

    const records = await options.database.patients.findAll(
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

    return options.database.patients.count(
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
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'patients',
            'patientID',
            filter.patientID,
          ),
        );
      }

      if (filter.name) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'patients',
            'name',
            filter.name,
          ),
        );
      }

      if (filter.dobRange) {
        const [start, end] = filter.dobRange;

        if (start !== undefined && start !== null && start !== '') {
          whereAnd.push({
            dob: {
              [Op.gte]: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          whereAnd.push({
            dob: {
              [Op.lte]: end,
            },
          });
        }
      }

      if (filter.sex) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'patients',
            'sex',
            filter.sex,
          ),
        );
      }

      if (filter.ageAtPositive) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'patients',
            'ageAtPositive',
            filter.ageAtPositive,
          ),
        );
      }

      if (filter.ageAtLastStatusUpdate) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'patients',
            'ageAtLastStatusUpdate',
            filter.ageAtLastStatusUpdate,
          ),
        );
      }

      if (filter.state) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'patients',
            'state',
            filter.state,
          ),
        );
      }

      if (filter.occupation) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'patients',
            'occupation',
            filter.occupation,
          ),
        );
      }

      if (filter.status) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'patients',
            'status',
            filter.status,
          ),
        );
      }

      if (filter.statusDateRange) {
        const [start, end] = filter.statusDateRange;

        if (start !== undefined && start !== null && start !== '') {
          whereAnd.push({
            statusDate: {
              [Op.gte]: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          whereAnd.push({
            statusDate: {
              [Op.lte]: end,
            },
          });
        }
      }

      if (filter.hospital) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'patients',
            'hospital',
            filter.hospital,
          ),
        );
      }

      if (filter.smoking) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'patients',
            'smoking',
            filter.smoking,
          ),
        );
      }

      if (filter.alcohol) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'patients',
            'alcohol',
            filter.alcohol,
          ),
        );
      }

      if (filter.diabetes) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'patients',
            'diabetes',
            filter.diabetes,
          ),
        );
      }

      if (filter.hypertension) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'patients',
            'hypertension',
            filter.hypertension,
          ),
        );
      }

      if (filter.otherCancer) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'patients',
            'otherCancer',
            filter.otherCancer,
          ),
        );
      }

      if (filter.familyCancer) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'patients',
            'familyCancer',
            filter.familyCancer,
          ),
        );
      }

      if (filter.eNT1stVisitRange) {
        const [start, end] = filter.eNT1stVisitRange;

        if (start !== undefined && start !== null && start !== '') {
          whereAnd.push({
            eNT1stVisit: {
              [Op.gte]: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          whereAnd.push({
            eNT1stVisit: {
              [Op.lte]: end,
            },
          });
        }
      }

      if (filter.onco1stVisitRange) {
        const [start, end] = filter.onco1stVisitRange;

        if (start !== undefined && start !== null && start !== '') {
          whereAnd.push({
            onco1stVisit: {
              [Op.gte]: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          whereAnd.push({
            onco1stVisit: {
              [Op.lte]: end,
            },
          });
        }
      }

      if (filter.stage) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'patients',
            'stage',
            filter.stage,
          ),
        );
      }

      if (filter.ethnicity) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'patients',
            'ethnicity',
            filter.ethnicity,
          ),
        );
      }

      if (filter.npc) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'patients',
            'npc',
            filter.npc,
          ),
        );
      }

      if (filter.firstPositiveBiopsyInHPE) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'patients',
            'firstPositiveBiopsyInHPE',
            filter.firstPositiveBiopsyInHPE,
          ),
        );
      }

      if (filter.firstPositiveBiopsyDateRange) {
        const [start, end] = filter.firstPositiveBiopsyDateRange;

        if (start !== undefined && start !== null && start !== '') {
          whereAnd.push({
            firstPositiveBiopsyDate: {
              [Op.gte]: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          whereAnd.push({
            firstPositiveBiopsyDate: {
              [Op.lte]: end,
            },
          });
        }
      }

      if (filter.wHOGrade) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'patients',
            'wHOGrade',
            filter.wHOGrade,
          ),
        );
      }

      if (filter.surgeriesCount) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'patients',
            'surgeriesCount',
            filter.surgeriesCount,
          ),
        );
      }

      if (filter.criticalLevel) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'patients',
            'criticalLevel',
            filter.criticalLevel,
          ),
        );
      }

      if (filter.recurrence) {
        whereAnd.push(
          SequelizeFilterUtils.ilikeIncludes(
            'patients',
            'recurrence',
            filter.recurrence,
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
    } = await options.database.patients.findAndCountAll({
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
              'patients',
              'patientID',
              query,
            ),
          },
        ],
      });
    }

    const where = { [Op.and]: whereAnd };

    const records = await options.database.patients.findAll(
      {
        attributes: ['id', 'patientID'],
        where,
        limit: limit ? Number(limit) : undefined,
        order: [['patientID', 'ASC']],
      },
    );

    return records.map((record) => ({
      id: record.id,
      label: record.patientID,
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
        entityName: 'patients',
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

export default PatientsRepository;

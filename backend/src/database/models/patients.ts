import { DataTypes } from 'sequelize';import moment from 'moment';

export default function (sequelize) {
  const patients = sequelize.define(
    'patients',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      patientID: {
        type: DataTypes.TEXT,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: [2, 255],
          notEmpty: true,
        }
      },
      dob: {
        type: DataTypes.DATEONLY,
        get: function() {
          // @ts-ignore
          return this.getDataValue('dob')
            ? moment
                // @ts-ignore
                .utc(this.getDataValue('dob'))
                .format('YYYY-MM-DD')
            : null;
        },
      },
      sex: {
        type: DataTypes.TEXT,
      },
      ageAtPositive: {
        type: DataTypes.TEXT,
      },
      ageAtLastStatusUpdate: {
        type: DataTypes.TEXT,
      },
      state: {
        type: DataTypes.TEXT,
      },
      occupation: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.TEXT,
      },
      statusDate: {
        type: DataTypes.DATEONLY,
        get: function() {
          // @ts-ignore
          return this.getDataValue('statusDate')
            ? moment
                // @ts-ignore
                .utc(this.getDataValue('statusDate'))
                .format('YYYY-MM-DD')
            : null;
        },
      },
      hospital: {
        type: DataTypes.TEXT,
      },
      smoking: {
        type: DataTypes.TEXT,
      },
      alcohol: {
        type: DataTypes.TEXT,
      },
      diabetes: {
        type: DataTypes.TEXT,
      },
      hypertension: {
        type: DataTypes.TEXT,
      },
      otherCancer: {
        type: DataTypes.TEXT,
      },
      familyCancer: {
        type: DataTypes.TEXT,
      },
      eNT1stVisit: {
        type: DataTypes.DATEONLY,
        get: function() {
          // @ts-ignore
          return this.getDataValue('eNT1stVisit')
            ? moment
                // @ts-ignore
                .utc(this.getDataValue('eNT1stVisit'))
                .format('YYYY-MM-DD')
            : null;
        },
      },
      onco1stVisit: {
        type: DataTypes.DATEONLY,
        get: function() {
          // @ts-ignore
          return this.getDataValue('onco1stVisit')
            ? moment
                // @ts-ignore
                .utc(this.getDataValue('onco1stVisit'))
                .format('YYYY-MM-DD')
            : null;
        },
      },
      stage: {
        type: DataTypes.TEXT,
      },
      ethnicity: {
        type: DataTypes.TEXT,
      },
      npc: {
        type: DataTypes.TEXT,
      },
      firstPositiveBiopsyInHPE: {
        type: DataTypes.TEXT,
      },
      firstPositiveBiopsyDate: {
        type: DataTypes.DATEONLY,
        get: function() {
          // @ts-ignore
          return this.getDataValue('firstPositiveBiopsyDate')
            ? moment
                // @ts-ignore
                .utc(this.getDataValue('firstPositiveBiopsyDate'))
                .format('YYYY-MM-DD')
            : null;
        },
      },
      wHOGrade: {
        type: DataTypes.TEXT,
      },
      surgeriesCount: {
        type: DataTypes.TEXT,
      },
      criticalLevel: {
        type: DataTypes.TEXT,
      },
      recurrence: {
        type: DataTypes.TEXT,
      },
      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,    
        validate: {
          len: [0, 255],
        },    
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['importHash', 'tenantId'],
          where: {
            deletedAt: null,
          },
        },

      ],
      timestamps: true,
      paranoid: true,
    },
  );

  patients.associate = (models) => {



    
    models.patients.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.patients.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.patients.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return patients;
}

import { DataTypes } from 'sequelize';import moment from 'moment';

export default function (sequelize) {
  const treatment = sequelize.define(
    'treatment',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      rTTreatmentIntent: {
        type: DataTypes.TEXT,
      },
      rTModality: {
        type: DataTypes.TEXT,
        validate: {
          len: [0, 21845],
        }
      },
      rTDoseGY: {
        type: DataTypes.TEXT,
      },
      rTConcurrentChemo: {
        type: DataTypes.TEXT,
      },
      rTFractions: {
        type: DataTypes.TEXT,
      },
      rTCompletedConcChemoSTD: {
        type: DataTypes.TEXT,
      },
      rTCompletedSTD: {
        type: DataTypes.TEXT,
      },
      rTEndDate: {
        type: DataTypes.DATEONLY,
        get: function() {
          // @ts-ignore
          return this.getDataValue('rTEndDate')
            ? moment
                // @ts-ignore
                .utc(this.getDataValue('rTEndDate'))
                .format('YYYY-MM-DD')
            : null;
        },
      },
      rTDuration: {
        type: DataTypes.TEXT,
      },
      rTStartedAfter: {
        type: DataTypes.DECIMAL,
      },
      cTIntent: {
        type: DataTypes.TEXT,
      },
      cTDrug: {
        type: DataTypes.TEXT,
      },
      cTTotalCyclesGiven: {
        type: DataTypes.TEXT,
      },
      cTCompletedSTD: {
        type: DataTypes.TEXT,
      },
      cTEndDate: {
        type: DataTypes.DATEONLY,
        get: function() {
          // @ts-ignore
          return this.getDataValue('cTEndDate')
            ? moment
                // @ts-ignore
                .utc(this.getDataValue('cTEndDate'))
                .format('YYYY-MM-DD')
            : null;
        },
      },
      cTDuration: {
        type: DataTypes.TEXT,
      },
      cTStartedAfter: {
        type: DataTypes.TEXT,
      },
      deathDate: {
        type: DataTypes.DATEONLY,
        get: function() {
          // @ts-ignore
          return this.getDataValue('deathDate')
            ? moment
                // @ts-ignore
                .utc(this.getDataValue('deathDate'))
                .format('YYYY-MM-DD')
            : null;
        },
      },
      daysRTEndUntillDeath: {
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

  treatment.associate = (models) => {
    models.treatment.belongsTo(models.patients, {
      as: 'patientID',
      constraints: false,
    });


    
    models.treatment.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.treatment.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.treatment.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return treatment;
}

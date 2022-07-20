import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const vitalSign = sequelize.define(
    'vitalSign',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      averageSPO2: {
        type: DataTypes.DECIMAL,
      },
      averageRestingHeartRate: {
        type: DataTypes.DECIMAL,
      },
      averageStepCount: {
        type: DataTypes.DECIMAL,
      },
      averageBPSystolic: {
        type: DataTypes.DECIMAL,
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

  vitalSign.associate = (models) => {
    models.vitalSign.belongsTo(models.patients, {
      as: 'patientID',
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });


    
    models.vitalSign.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.vitalSign.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.vitalSign.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return vitalSign;
}

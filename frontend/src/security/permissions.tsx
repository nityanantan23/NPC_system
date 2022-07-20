import Roles from 'src/security/roles';
import Plans from 'src/security/plans';
import Storage from 'src/security/storage';

const storage = Storage.values;
const roles = Roles.values;
const plans = Plans.values;

class Permissions {
  static get values() {
    return {
      tenantEdit: {
        id: 'tenantEdit',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      tenantDestroy: {
        id: 'tenantDestroy',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      planEdit: {
        id: 'planEdit',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      planRead: {
        id: 'planRead',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userEdit: {
        id: 'userEdit',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userDestroy: {
        id: 'userDestroy',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userCreate: {
        id: 'userCreate',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userImport: {
        id: 'userImport',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userRead: {
        id: 'userRead',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userAutocomplete: {
        id: 'userAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
         allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      auditLogRead: {
        id: 'auditLogRead',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      settingsEdit: {
        id: 'settingsEdit',
        allowedRoles: [roles.admin],
         allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [
          storage.settingsBackgroundImages,
          storage.settingsLogos,
        ],
      },
      patientsImport: {
        id: 'patientsImport',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      patientsCreate: {
        id: 'patientsCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      patientsEdit: {
        id: 'patientsEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      patientsDestroy: {
        id: 'patientsDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      patientsRead: {
        id: 'patientsRead',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      patientsAutocomplete: {
        id: 'patientsAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      treatmentImport: {
        id: 'treatmentImport',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      treatmentCreate: {
        id: 'treatmentCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      treatmentEdit: {
        id: 'treatmentEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      treatmentDestroy: {
        id: 'treatmentDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      treatmentRead: {
        id: 'treatmentRead',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      treatmentAutocomplete: {
        id: 'treatmentAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      vitalSignImport: {
        id: 'vitalSignImport',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      vitalSignCreate: {
        id: 'vitalSignCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      vitalSignEdit: {
        id: 'vitalSignEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      vitalSignDestroy: {
        id: 'vitalSignDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      vitalSignRead: {
        id: 'vitalSignRead',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      vitalSignAutocomplete: {
        id: 'vitalSignAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
    };
  }

  static get asArray() {
    return Object.keys(this.values).map((value) => {
      return this.values[value];
    });
  }
}

export default Permissions;

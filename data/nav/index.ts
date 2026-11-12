import type { RawGroup } from '../navigation';
import { foundationNav } from './foundation';
import { cockpitNav } from './cockpit';
import { servicesNav } from './services';
import { cloudFoundryNav } from './cloud-foundry';
import { spacesNav } from './spaces';
import { html5Nav } from './html5';
import { connectivityNav } from './connectivity';
import { securityNav } from './security';
import { usersNav } from './users';
import { entitlementsNav, analyticsNav } from './entitlements-analytics';
import { advancedNav } from './advanced';
import { projectsNav } from './projects';

/** 左侧菜单顺序：与 SAP BTP Cockpit Subaccount 的功能分组保持可对照关系 */
export const rawNavigation: RawGroup[] = [
  foundationNav,
  cockpitNav,
  servicesNav,
  cloudFoundryNav,
  spacesNav,
  html5Nav,
  connectivityNav,
  securityNav,
  usersNav,
  entitlementsNav,
  analyticsNav,
  advancedNav,
  projectsNav,
];

import type {ComponentType} from 'react';
import type {Locale} from '@/lib/i18n';
import WebBasicsTh from '@/lessons/th/web-basics.mdx';
import WebBasicsEn from '@/lessons/en/web-basics.mdx';
import JsEssentialsTh from '@/lessons/th/js-essentials.mdx';
import JsEssentialsEn from '@/lessons/en/js-essentials.mdx';
import ReactIntroTh from '@/lessons/th/react-intro.mdx';
import ReactIntroEn from '@/lessons/en/react-intro.mdx';
import JsxTh from '@/lessons/th/jsx.mdx';
import JsxEn from '@/lessons/en/jsx.mdx';
import FirstComponentTh from '@/lessons/th/first-component.mdx';
import FirstComponentEn from '@/lessons/en/first-component.mdx';
import PropsTh from '@/lessons/th/props.mdx';
import PropsEn from '@/lessons/en/props.mdx';
import StateTh from '@/lessons/th/state.mdx';
import StateEn from '@/lessons/en/state.mdx';
import EventsTh from '@/lessons/th/events.mdx';
import EventsEn from '@/lessons/en/events.mdx';
import ConditionalRenderingTh from '@/lessons/th/conditional-rendering.mdx';
import ConditionalRenderingEn from '@/lessons/en/conditional-rendering.mdx';
import ListRenderingTh from '@/lessons/th/list-rendering.mdx';
import ListRenderingEn from '@/lessons/en/list-rendering.mdx';
import UseEffectTh from '@/lessons/th/use-effect.mdx';
import UseEffectEn from '@/lessons/en/use-effect.mdx';
import FetchApiTh from '@/lessons/th/fetch-api.mdx';
import FetchApiEn from '@/lessons/en/fetch-api.mdx';
import FormsTh from '@/lessons/th/forms.mdx';
import FormsEn from '@/lessons/en/forms.mdx';
import CompositionTh from '@/lessons/th/composition.mdx';
import CompositionEn from '@/lessons/en/composition.mdx';
import PropsDrillingTh from '@/lessons/th/props-drilling.mdx';
import PropsDrillingEn from '@/lessons/en/props-drilling.mdx';
import RoutingBasicsTh from '@/lessons/th/routing-basics.mdx';
import RoutingBasicsEn from '@/lessons/en/routing-basics.mdx';
import DynamicParamsTh from '@/lessons/th/dynamic-params.mdx';
import DynamicParamsEn from '@/lessons/en/dynamic-params.mdx';
import NotFoundTh from '@/lessons/th/not-found.mdx';
import NotFoundEn from '@/lessons/en/not-found.mdx';
import OrganizingFilesTh from '@/lessons/th/organizing-files.mdx';
import OrganizingFilesEn from '@/lessons/en/organizing-files.mdx';
import MiniSetupTh from '@/lessons/th/mini-setup.mdx';
import MiniSetupEn from '@/lessons/en/mini-setup.mdx';
import MiniUiLayoutTh from '@/lessons/th/mini-ui-layout.mdx';
import MiniUiLayoutEn from '@/lessons/en/mini-ui-layout.mdx';
import MiniFetchTh from '@/lessons/th/mini-fetch.mdx';
import MiniFetchEn from '@/lessons/en/mini-fetch.mdx';
import MiniReuseTh from '@/lessons/th/mini-reuse.mdx';
import MiniReuseEn from '@/lessons/en/mini-reuse.mdx';
import MiniRoutingTh from '@/lessons/th/mini-routing.mdx';
import MiniRoutingEn from '@/lessons/en/mini-routing.mdx';
import MiniDeployTh from '@/lessons/th/mini-deploy.mdx';
import MiniDeployEn from '@/lessons/en/mini-deploy.mdx';
import DeployVercelTh from '@/lessons/th/deploy-vercel.mdx';
import DeployVercelEn from '@/lessons/en/deploy-vercel.mdx';
import ProjectStructureTh from '@/lessons/th/project-structure.mdx';
import ProjectStructureEn from '@/lessons/en/project-structure.mdx';
import DebuggingTh from '@/lessons/th/debugging.mdx';
import DebuggingEn from '@/lessons/en/debugging.mdx';

type LessonComponentMap = Record<string, ComponentType<any>>;

export const lessonContent: Record<Locale, LessonComponentMap> = {
  th: {
    'web-basics': WebBasicsTh,
    'js-essentials': JsEssentialsTh,
    'react-intro': ReactIntroTh,
    'jsx': JsxTh,
    'first-component': FirstComponentTh,
    'props': PropsTh,
    'state': StateTh,
    'events': EventsTh,
    'conditional-rendering': ConditionalRenderingTh,
    'list-rendering': ListRenderingTh,
    'use-effect': UseEffectTh,
    'fetch-api': FetchApiTh,
    'forms': FormsTh,
    'composition': CompositionTh,
    'props-drilling': PropsDrillingTh,
    'routing-basics': RoutingBasicsTh,
    'dynamic-params': DynamicParamsTh,
    'not-found': NotFoundTh,
    'organizing-files': OrganizingFilesTh,
    'mini-setup': MiniSetupTh,
    'mini-ui-layout': MiniUiLayoutTh,
    'mini-fetch': MiniFetchTh,
    'mini-reuse': MiniReuseTh,
    'mini-routing': MiniRoutingTh,
    'mini-deploy': MiniDeployTh,
    'deploy-vercel': DeployVercelTh,
    'project-structure': ProjectStructureTh,
    'debugging': DebuggingTh
  },
  en: {
    'web-basics': WebBasicsEn,
    'js-essentials': JsEssentialsEn,
    'react-intro': ReactIntroEn,
    'jsx': JsxEn,
    'first-component': FirstComponentEn,
    'props': PropsEn,
    'state': StateEn,
    'events': EventsEn,
    'conditional-rendering': ConditionalRenderingEn,
    'list-rendering': ListRenderingEn,
    'use-effect': UseEffectEn,
    'fetch-api': FetchApiEn,
    'forms': FormsEn,
    'composition': CompositionEn,
    'props-drilling': PropsDrillingEn,
    'routing-basics': RoutingBasicsEn,
    'dynamic-params': DynamicParamsEn,
    'not-found': NotFoundEn,
    'organizing-files': OrganizingFilesEn,
    'mini-setup': MiniSetupEn,
    'mini-ui-layout': MiniUiLayoutEn,
    'mini-fetch': MiniFetchEn,
    'mini-reuse': MiniReuseEn,
    'mini-routing': MiniRoutingEn,
    'mini-deploy': MiniDeployEn,
    'deploy-vercel': DeployVercelEn,
    'project-structure': ProjectStructureEn,
    'debugging': DebuggingEn
  }
};

import { DEFAULT_LOCALE, isSupported } from '$lib/i18n/index.js';

export { entries } from '../entries.js';

// English is eager — it's the fallback for every other locale and the
// content for the unprefixed route, so there's no world where it isn't
// needed.
import readmeEn from '$lib/paradigm/README.md?raw';
import executionEn from '$lib/paradigm/execution_of_a_service.md?raw';
import balancerEn from '$lib/paradigm/service_balancer.md?raw';

/**
 * One dynamic-import loader set per locale, so each language's three
 * paradigm documents become their own Vite chunks — fetched only for a
 * visitor who actually reads this page in that language, instead of
 * baking all ten languages' documents (~450 kB) into this route's
 * bundle. Mirrors the LOADERS pattern in `$lib/i18n/index.js`.
 */
const DOC_LOADERS = {
	es: {
		readme: () => import('$lib/paradigm/es/README.md?raw'),
		execution: () => import('$lib/paradigm/es/execution_of_a_service.md?raw'),
		balancer: () => import('$lib/paradigm/es/service_balancer.md?raw')
	},
	zh: {
		readme: () => import('$lib/paradigm/zh/README.md?raw'),
		execution: () => import('$lib/paradigm/zh/execution_of_a_service.md?raw'),
		balancer: () => import('$lib/paradigm/zh/service_balancer.md?raw')
	},
	hi: {
		readme: () => import('$lib/paradigm/hi/README.md?raw'),
		execution: () => import('$lib/paradigm/hi/execution_of_a_service.md?raw'),
		balancer: () => import('$lib/paradigm/hi/service_balancer.md?raw')
	},
	ru: {
		readme: () => import('$lib/paradigm/ru/README.md?raw'),
		execution: () => import('$lib/paradigm/ru/execution_of_a_service.md?raw'),
		balancer: () => import('$lib/paradigm/ru/service_balancer.md?raw')
	},
	fr: {
		readme: () => import('$lib/paradigm/fr/README.md?raw'),
		execution: () => import('$lib/paradigm/fr/execution_of_a_service.md?raw'),
		balancer: () => import('$lib/paradigm/fr/service_balancer.md?raw')
	},
	pt: {
		readme: () => import('$lib/paradigm/pt/README.md?raw'),
		execution: () => import('$lib/paradigm/pt/execution_of_a_service.md?raw'),
		balancer: () => import('$lib/paradigm/pt/service_balancer.md?raw')
	},
	sw: {
		readme: () => import('$lib/paradigm/sw/README.md?raw'),
		execution: () => import('$lib/paradigm/sw/execution_of_a_service.md?raw'),
		balancer: () => import('$lib/paradigm/sw/service_balancer.md?raw')
	},
	ja: {
		readme: () => import('$lib/paradigm/ja/README.md?raw'),
		execution: () => import('$lib/paradigm/ja/execution_of_a_service.md?raw'),
		balancer: () => import('$lib/paradigm/ja/service_balancer.md?raw')
	},
	ar: {
		readme: () => import('$lib/paradigm/ar/README.md?raw'),
		execution: () => import('$lib/paradigm/ar/execution_of_a_service.md?raw'),
		balancer: () => import('$lib/paradigm/ar/service_balancer.md?raw')
	}
};

type LocaleWithDocs = keyof typeof DOC_LOADERS;

function hasOwnDocs(code: string): code is LocaleWithDocs {
	return Object.prototype.hasOwnProperty.call(DOC_LOADERS, code);
}

export async function load({ params }: { params: { lang?: string } }) {
	const code = params.lang;
	if (!code || code === DEFAULT_LOCALE || !isSupported(code) || !hasOwnDocs(code)) {
		return { docs: { readme: readmeEn, execution: executionEn, balancer: balancerEn } };
	}
	const loaders = DOC_LOADERS[code];
	const [readme, execution, balancer] = await Promise.all([
		loaders.readme(),
		loaders.execution(),
		loaders.balancer()
	]);
	return {
		docs: { readme: readme.default, execution: execution.default, balancer: balancer.default }
	};
}

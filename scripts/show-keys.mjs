/* Print the current value of specific dotted key paths, per locale.
 *   node scripts/show-keys.mjs es zh -- home.coordination.items.1.body
 * With no `--` section it uses the payment-model key set below. */
import { fileURLToPath } from 'node:url';
import { dirname, resolve as resolvePath } from 'node:path';

const dir = resolvePath(dirname(fileURLToPath(import.meta.url)), '../src/lib/i18n');

const DEFAULT_KEYS = [
	'home.scenes.coordination.beats.1.h',
	'home.scenes.coordination.beats.1.p',
	'home.scenes.coordination.beats.2.h',
	'home.scenes.coordination.beats.2.p',
	'home.coordination.items.1.body',
	'home.coordination.items.1.points.0',
	'home.coordination.items.1.points.2',
	'depin.payoff.items.2.title',
	'depin.payoff.items.2.body',
	'depin.steps.items.3.body',
	'users.scenes.pay.beats.0.h',
	'users.scenes.pay.beats.0.p',
	'users.scenes.pay.beats.1.p',
	'users.steps.items.3.title',
	'users.steps.items.3.body'
];

const argv = process.argv.slice(2);
const sep = argv.indexOf('--');
const codes = (sep === -1 ? argv : argv.slice(0, sep)).filter(Boolean);
const keys = sep === -1 ? DEFAULT_KEYS : argv.slice(sep + 1);

const get = (o, k) => k.split('.').reduce((n, p) => (n == null ? n : n[p]), o);

for (const code of codes) {
	const d = (await import(resolvePath(dir, `${code}.js`))).default;
	console.log(`\n########## ${code} ##########`);
	for (const k of keys) console.log(`${k}\n  ${JSON.stringify(get(d, k))}`);
}

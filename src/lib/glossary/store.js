/*
 * src/lib/glossary/store.js
 * ------------------------------------------------------------------
 * Whether the glossary layer is on, and the term currently open.
 *
 * DEFAULT: ON.
 *
 * That is a deliberate product decision and worth writing down,
 * because the instinct is to default it off and let people opt in.
 * The reader this exists for — someone who does not know what "peer-
 * to-peer" means — is exactly the reader who will not go looking for a
 * toggle labelled "explain the jargon", because they don't yet know
 * they need one. They just leave. Meanwhile the cost to the expert is
 * a handful of dotted underlines they never click, and a switch that
 * turns them off in one tap and is remembered forever after.
 *
 * Asymmetric costs, so: on by default, off in one click, sticky.
 */

import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'celaut-glossary';
/** Set once the reader has opened (or dismissed) anything, so the
 *  first-run hint never appears twice. */
const SEEN_KEY = 'celaut-glossary-seen';

function initialEnabled() {
	if (!browser) return true;
	try {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved === 'off') return false;
		if (saved === 'on') return true;
	} catch (e) {
		/* private mode — fall through to the default */
	}
	return true;
}

function initialSeen() {
	if (!browser) return true;
	try {
		return localStorage.getItem(SEEN_KEY) === '1';
	} catch (e) {
		return true;
	}
}

/** @type {import('svelte/store').Writable<boolean>} */
export const glossaryEnabled = writable(initialEnabled());

/**
 * The open term, or null.
 * `{ id, rect }` — `rect` is the bounding box of the word that was
 * clicked, in viewport coordinates, so the popover can place itself
 * without the trigger element having to be kept alive.
 * @type {import('svelte/store').Writable<{ id: string, rect: DOMRect } | null>}
 */
export const openTerm = writable(null);

/** True until the reader has interacted with the layer even once. */
export const glossaryUnseen = writable(!initialSeen());

export function toggleGlossary() {
	glossaryEnabled.update((on) => {
		const next = !on;
		if (browser) {
			try {
				localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off');
			} catch (e) {
				/* ignore persistence failure */
			}
		}
		if (!next) openTerm.set(null);
		return next;
	});
	markSeen();
}

/** Record that the reader has met the feature, so the hint retires. */
export function markSeen() {
	glossaryUnseen.set(false);
	if (!browser) return;
	try {
		localStorage.setItem(SEEN_KEY, '1');
	} catch (e) {
		/* ignore */
	}
}

export function closeTerm() {
	openTerm.set(null);
}

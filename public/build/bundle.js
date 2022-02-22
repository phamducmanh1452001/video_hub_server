
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    // unfortunately this can't be a constant as that wouldn't be tree-shakeable
    // so we cache the result instead
    let crossorigin;
    function is_crossorigin() {
        if (crossorigin === undefined) {
            crossorigin = false;
            try {
                if (typeof window !== 'undefined' && window.parent) {
                    void window.parent.document;
                }
            }
            catch (error) {
                crossorigin = true;
            }
        }
        return crossorigin;
    }
    function add_resize_listener(node, fn) {
        const computed_style = getComputedStyle(node);
        if (computed_style.position === 'static') {
            node.style.position = 'relative';
        }
        const iframe = element('iframe');
        iframe.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; ' +
            'overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;');
        iframe.setAttribute('aria-hidden', 'true');
        iframe.tabIndex = -1;
        const crossorigin = is_crossorigin();
        let unsubscribe;
        if (crossorigin) {
            iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>";
            unsubscribe = listen(window, 'message', (event) => {
                if (event.source === iframe.contentWindow)
                    fn();
            });
        }
        else {
            iframe.src = 'about:blank';
            iframe.onload = () => {
                unsubscribe = listen(iframe.contentWindow, 'resize', fn);
            };
        }
        append(node, iframe);
        return () => {
            if (crossorigin) {
                unsubscribe();
            }
            else if (unsubscribe && iframe.contentWindow) {
                unsubscribe();
            }
            detach(iframe);
        };
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
    }
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.46.4' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    const LOCATION = {};
    const ROUTER = {};

    /**
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/history.js
     *
     * https://github.com/reach/router/blob/master/LICENSE
     * */

    function getLocation(source) {
      return {
        ...source.location,
        state: source.history.state,
        key: (source.history.state && source.history.state.key) || "initial"
      };
    }

    function createHistory(source, options) {
      const listeners = [];
      let location = getLocation(source);

      return {
        get location() {
          return location;
        },

        listen(listener) {
          listeners.push(listener);

          const popstateListener = () => {
            location = getLocation(source);
            listener({ location, action: "POP" });
          };

          source.addEventListener("popstate", popstateListener);

          return () => {
            source.removeEventListener("popstate", popstateListener);

            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
          };
        },

        navigate(to, { state, replace = false } = {}) {
          state = { ...state, key: Date.now() + "" };
          // try...catch iOS Safari limits to 100 pushState calls
          try {
            if (replace) {
              source.history.replaceState(state, null, to);
            } else {
              source.history.pushState(state, null, to);
            }
          } catch (e) {
            source.location[replace ? "replace" : "assign"](to);
          }

          location = getLocation(source);
          listeners.forEach(listener => listener({ location, action: "PUSH" }));
        }
      };
    }

    // Stores history entries in memory for testing or other platforms like Native
    function createMemorySource(initialPathname = "/") {
      let index = 0;
      const stack = [{ pathname: initialPathname, search: "" }];
      const states = [];

      return {
        get location() {
          return stack[index];
        },
        addEventListener(name, fn) {},
        removeEventListener(name, fn) {},
        history: {
          get entries() {
            return stack;
          },
          get index() {
            return index;
          },
          get state() {
            return states[index];
          },
          pushState(state, _, uri) {
            const [pathname, search = ""] = uri.split("?");
            index++;
            stack.push({ pathname, search });
            states.push(state);
          },
          replaceState(state, _, uri) {
            const [pathname, search = ""] = uri.split("?");
            stack[index] = { pathname, search };
            states[index] = state;
          }
        }
      };
    }

    // Global history uses window.history as the source if available,
    // otherwise a memory history
    const canUseDOM = Boolean(
      typeof window !== "undefined" &&
        window.document &&
        window.document.createElement
    );
    const globalHistory = createHistory(canUseDOM ? window : createMemorySource());
    const { navigate } = globalHistory;

    /**
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/utils.js
     *
     * https://github.com/reach/router/blob/master/LICENSE
     * */

    const paramRe = /^:(.+)/;

    const SEGMENT_POINTS = 4;
    const STATIC_POINTS = 3;
    const DYNAMIC_POINTS = 2;
    const SPLAT_PENALTY = 1;
    const ROOT_POINTS = 1;

    /**
     * Check if `segment` is a root segment
     * @param {string} segment
     * @return {boolean}
     */
    function isRootSegment(segment) {
      return segment === "";
    }

    /**
     * Check if `segment` is a dynamic segment
     * @param {string} segment
     * @return {boolean}
     */
    function isDynamic(segment) {
      return paramRe.test(segment);
    }

    /**
     * Check if `segment` is a splat
     * @param {string} segment
     * @return {boolean}
     */
    function isSplat(segment) {
      return segment[0] === "*";
    }

    /**
     * Split up the URI into segments delimited by `/`
     * @param {string} uri
     * @return {string[]}
     */
    function segmentize(uri) {
      return (
        uri
          // Strip starting/ending `/`
          .replace(/(^\/+|\/+$)/g, "")
          .split("/")
      );
    }

    /**
     * Strip `str` of potential start and end `/`
     * @param {string} str
     * @return {string}
     */
    function stripSlashes(str) {
      return str.replace(/(^\/+|\/+$)/g, "");
    }

    /**
     * Score a route depending on how its individual segments look
     * @param {object} route
     * @param {number} index
     * @return {object}
     */
    function rankRoute(route, index) {
      const score = route.default
        ? 0
        : segmentize(route.path).reduce((score, segment) => {
            score += SEGMENT_POINTS;

            if (isRootSegment(segment)) {
              score += ROOT_POINTS;
            } else if (isDynamic(segment)) {
              score += DYNAMIC_POINTS;
            } else if (isSplat(segment)) {
              score -= SEGMENT_POINTS + SPLAT_PENALTY;
            } else {
              score += STATIC_POINTS;
            }

            return score;
          }, 0);

      return { route, score, index };
    }

    /**
     * Give a score to all routes and sort them on that
     * @param {object[]} routes
     * @return {object[]}
     */
    function rankRoutes(routes) {
      return (
        routes
          .map(rankRoute)
          // If two routes have the exact same score, we go by index instead
          .sort((a, b) =>
            a.score < b.score ? 1 : a.score > b.score ? -1 : a.index - b.index
          )
      );
    }

    /**
     * Ranks and picks the best route to match. Each segment gets the highest
     * amount of points, then the type of segment gets an additional amount of
     * points where
     *
     *  static > dynamic > splat > root
     *
     * This way we don't have to worry about the order of our routes, let the
     * computers do it.
     *
     * A route looks like this
     *
     *  { path, default, value }
     *
     * And a returned match looks like:
     *
     *  { route, params, uri }
     *
     * @param {object[]} routes
     * @param {string} uri
     * @return {?object}
     */
    function pick(routes, uri) {
      let match;
      let default_;

      const [uriPathname] = uri.split("?");
      const uriSegments = segmentize(uriPathname);
      const isRootUri = uriSegments[0] === "";
      const ranked = rankRoutes(routes);

      for (let i = 0, l = ranked.length; i < l; i++) {
        const route = ranked[i].route;
        let missed = false;

        if (route.default) {
          default_ = {
            route,
            params: {},
            uri
          };
          continue;
        }

        const routeSegments = segmentize(route.path);
        const params = {};
        const max = Math.max(uriSegments.length, routeSegments.length);
        let index = 0;

        for (; index < max; index++) {
          const routeSegment = routeSegments[index];
          const uriSegment = uriSegments[index];

          if (routeSegment !== undefined && isSplat(routeSegment)) {
            // Hit a splat, just grab the rest, and return a match
            // uri:   /files/documents/work
            // route: /files/* or /files/*splatname
            const splatName = routeSegment === "*" ? "*" : routeSegment.slice(1);

            params[splatName] = uriSegments
              .slice(index)
              .map(decodeURIComponent)
              .join("/");
            break;
          }

          if (uriSegment === undefined) {
            // URI is shorter than the route, no match
            // uri:   /users
            // route: /users/:userId
            missed = true;
            break;
          }

          let dynamicMatch = paramRe.exec(routeSegment);

          if (dynamicMatch && !isRootUri) {
            const value = decodeURIComponent(uriSegment);
            params[dynamicMatch[1]] = value;
          } else if (routeSegment !== uriSegment) {
            // Current segments don't match, not dynamic, not splat, so no match
            // uri:   /users/123/settings
            // route: /users/:id/profile
            missed = true;
            break;
          }
        }

        if (!missed) {
          match = {
            route,
            params,
            uri: "/" + uriSegments.slice(0, index).join("/")
          };
          break;
        }
      }

      return match || default_ || null;
    }

    /**
     * Check if the `path` matches the `uri`.
     * @param {string} path
     * @param {string} uri
     * @return {?object}
     */
    function match(route, uri) {
      return pick([route], uri);
    }

    /**
     * Combines the `basepath` and the `path` into one path.
     * @param {string} basepath
     * @param {string} path
     */
    function combinePaths(basepath, path) {
      return `${stripSlashes(
    path === "/" ? basepath : `${stripSlashes(basepath)}/${stripSlashes(path)}`
  )}/`;
    }

    /**
     * Decides whether a given `event` should result in a navigation or not.
     * @param {object} event
     */
    function shouldNavigate(event) {
      return (
        !event.defaultPrevented &&
        event.button === 0 &&
        !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
      );
    }

    function hostMatches(anchor) {
      const host = location.host;
      return (
        anchor.host == host ||
        // svelte seems to kill anchor.host value in ie11, so fall back to checking href
        anchor.href.indexOf(`https://${host}`) === 0 ||
        anchor.href.indexOf(`http://${host}`) === 0
      )
    }

    /* node_modules/svelte-routing/src/Router.svelte generated by Svelte v3.46.4 */

    function create_fragment$8(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[9].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 256)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[8],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[8])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[8], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let $location;
    	let $routes;
    	let $base;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Router', slots, ['default']);
    	let { basepath = "/" } = $$props;
    	let { url = null } = $$props;
    	const locationContext = getContext(LOCATION);
    	const routerContext = getContext(ROUTER);
    	const routes = writable([]);
    	validate_store(routes, 'routes');
    	component_subscribe($$self, routes, value => $$invalidate(6, $routes = value));
    	const activeRoute = writable(null);
    	let hasActiveRoute = false; // Used in SSR to synchronously set that a Route is active.

    	// If locationContext is not set, this is the topmost Router in the tree.
    	// If the `url` prop is given we force the location to it.
    	const location = locationContext || writable(url ? { pathname: url } : globalHistory.location);

    	validate_store(location, 'location');
    	component_subscribe($$self, location, value => $$invalidate(5, $location = value));

    	// If routerContext is set, the routerBase of the parent Router
    	// will be the base for this Router's descendants.
    	// If routerContext is not set, the path and resolved uri will both
    	// have the value of the basepath prop.
    	const base = routerContext
    	? routerContext.routerBase
    	: writable({ path: basepath, uri: basepath });

    	validate_store(base, 'base');
    	component_subscribe($$self, base, value => $$invalidate(7, $base = value));

    	const routerBase = derived([base, activeRoute], ([base, activeRoute]) => {
    		// If there is no activeRoute, the routerBase will be identical to the base.
    		if (activeRoute === null) {
    			return base;
    		}

    		const { path: basepath } = base;
    		const { route, uri } = activeRoute;

    		// Remove the potential /* or /*splatname from
    		// the end of the child Routes relative paths.
    		const path = route.default
    		? basepath
    		: route.path.replace(/\*.*$/, "");

    		return { path, uri };
    	});

    	function registerRoute(route) {
    		const { path: basepath } = $base;
    		let { path } = route;

    		// We store the original path in the _path property so we can reuse
    		// it when the basepath changes. The only thing that matters is that
    		// the route reference is intact, so mutation is fine.
    		route._path = path;

    		route.path = combinePaths(basepath, path);

    		if (typeof window === "undefined") {
    			// In SSR we should set the activeRoute immediately if it is a match.
    			// If there are more Routes being registered after a match is found,
    			// we just skip them.
    			if (hasActiveRoute) {
    				return;
    			}

    			const matchingRoute = match(route, $location.pathname);

    			if (matchingRoute) {
    				activeRoute.set(matchingRoute);
    				hasActiveRoute = true;
    			}
    		} else {
    			routes.update(rs => {
    				rs.push(route);
    				return rs;
    			});
    		}
    	}

    	function unregisterRoute(route) {
    		routes.update(rs => {
    			const index = rs.indexOf(route);
    			rs.splice(index, 1);
    			return rs;
    		});
    	}

    	if (!locationContext) {
    		// The topmost Router in the tree is responsible for updating
    		// the location store and supplying it through context.
    		onMount(() => {
    			const unlisten = globalHistory.listen(history => {
    				location.set(history.location);
    			});

    			return unlisten;
    		});

    		setContext(LOCATION, location);
    	}

    	setContext(ROUTER, {
    		activeRoute,
    		base,
    		routerBase,
    		registerRoute,
    		unregisterRoute
    	});

    	const writable_props = ['basepath', 'url'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Router> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('basepath' in $$props) $$invalidate(3, basepath = $$props.basepath);
    		if ('url' in $$props) $$invalidate(4, url = $$props.url);
    		if ('$$scope' in $$props) $$invalidate(8, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		setContext,
    		onMount,
    		writable,
    		derived,
    		LOCATION,
    		ROUTER,
    		globalHistory,
    		pick,
    		match,
    		stripSlashes,
    		combinePaths,
    		basepath,
    		url,
    		locationContext,
    		routerContext,
    		routes,
    		activeRoute,
    		hasActiveRoute,
    		location,
    		base,
    		routerBase,
    		registerRoute,
    		unregisterRoute,
    		$location,
    		$routes,
    		$base
    	});

    	$$self.$inject_state = $$props => {
    		if ('basepath' in $$props) $$invalidate(3, basepath = $$props.basepath);
    		if ('url' in $$props) $$invalidate(4, url = $$props.url);
    		if ('hasActiveRoute' in $$props) hasActiveRoute = $$props.hasActiveRoute;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$base*/ 128) {
    			// This reactive statement will update all the Routes' path when
    			// the basepath changes.
    			{
    				const { path: basepath } = $base;

    				routes.update(rs => {
    					rs.forEach(r => r.path = combinePaths(basepath, r._path));
    					return rs;
    				});
    			}
    		}

    		if ($$self.$$.dirty & /*$routes, $location*/ 96) {
    			// This reactive statement will be run when the Router is created
    			// when there are no Routes and then again the following tick, so it
    			// will not find an active Route in SSR and in the browser it will only
    			// pick an active Route after all Routes have been registered.
    			{
    				const bestMatch = pick($routes, $location.pathname);
    				activeRoute.set(bestMatch);
    			}
    		}
    	};

    	return [
    		routes,
    		location,
    		base,
    		basepath,
    		url,
    		$location,
    		$routes,
    		$base,
    		$$scope,
    		slots
    	];
    }

    class Router extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, { basepath: 3, url: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment$8.name
    		});
    	}

    	get basepath() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set basepath(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get url() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-routing/src/Route.svelte generated by Svelte v3.46.4 */

    const get_default_slot_changes = dirty => ({
    	params: dirty & /*routeParams*/ 4,
    	location: dirty & /*$location*/ 16
    });

    const get_default_slot_context = ctx => ({
    	params: /*routeParams*/ ctx[2],
    	location: /*$location*/ ctx[4]
    });

    // (40:0) {#if $activeRoute !== null && $activeRoute.route === route}
    function create_if_block$3(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_1$3, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*component*/ ctx[0] !== null) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(40:0) {#if $activeRoute !== null && $activeRoute.route === route}",
    		ctx
    	});

    	return block;
    }

    // (43:2) {:else}
    function create_else_block$1(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[10].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[9], get_default_slot_context);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope, routeParams, $location*/ 532)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[9],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[9])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[9], dirty, get_default_slot_changes),
    						get_default_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(43:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (41:2) {#if component !== null}
    function create_if_block_1$3(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;

    	const switch_instance_spread_levels = [
    		{ location: /*$location*/ ctx[4] },
    		/*routeParams*/ ctx[2],
    		/*routeProps*/ ctx[3]
    	];

    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*$location, routeParams, routeProps*/ 28)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*$location*/ 16 && { location: /*$location*/ ctx[4] },
    					dirty & /*routeParams*/ 4 && get_spread_object(/*routeParams*/ ctx[2]),
    					dirty & /*routeProps*/ 8 && get_spread_object(/*routeProps*/ ctx[3])
    				])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(41:2) {#if component !== null}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*$activeRoute*/ ctx[1] !== null && /*$activeRoute*/ ctx[1].route === /*route*/ ctx[7] && create_if_block$3(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*$activeRoute*/ ctx[1] !== null && /*$activeRoute*/ ctx[1].route === /*route*/ ctx[7]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*$activeRoute*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$3(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let $activeRoute;
    	let $location;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Route', slots, ['default']);
    	let { path = "" } = $$props;
    	let { component = null } = $$props;
    	const { registerRoute, unregisterRoute, activeRoute } = getContext(ROUTER);
    	validate_store(activeRoute, 'activeRoute');
    	component_subscribe($$self, activeRoute, value => $$invalidate(1, $activeRoute = value));
    	const location = getContext(LOCATION);
    	validate_store(location, 'location');
    	component_subscribe($$self, location, value => $$invalidate(4, $location = value));

    	const route = {
    		path,
    		// If no path prop is given, this Route will act as the default Route
    		// that is rendered if no other Route in the Router is a match.
    		default: path === ""
    	};

    	let routeParams = {};
    	let routeProps = {};
    	registerRoute(route);

    	// There is no need to unregister Routes in SSR since it will all be
    	// thrown away anyway.
    	if (typeof window !== "undefined") {
    		onDestroy(() => {
    			unregisterRoute(route);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(13, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ('path' in $$new_props) $$invalidate(8, path = $$new_props.path);
    		if ('component' in $$new_props) $$invalidate(0, component = $$new_props.component);
    		if ('$$scope' in $$new_props) $$invalidate(9, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		onDestroy,
    		ROUTER,
    		LOCATION,
    		path,
    		component,
    		registerRoute,
    		unregisterRoute,
    		activeRoute,
    		location,
    		route,
    		routeParams,
    		routeProps,
    		$activeRoute,
    		$location
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(13, $$props = assign(assign({}, $$props), $$new_props));
    		if ('path' in $$props) $$invalidate(8, path = $$new_props.path);
    		if ('component' in $$props) $$invalidate(0, component = $$new_props.component);
    		if ('routeParams' in $$props) $$invalidate(2, routeParams = $$new_props.routeParams);
    		if ('routeProps' in $$props) $$invalidate(3, routeProps = $$new_props.routeProps);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$activeRoute*/ 2) {
    			if ($activeRoute && $activeRoute.route === route) {
    				$$invalidate(2, routeParams = $activeRoute.params);
    			}
    		}

    		{
    			const { path, component, ...rest } = $$props;
    			$$invalidate(3, routeProps = rest);
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		component,
    		$activeRoute,
    		routeParams,
    		routeProps,
    		$location,
    		activeRoute,
    		location,
    		route,
    		path,
    		$$scope,
    		slots
    	];
    }

    class Route extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { path: 8, component: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Route",
    			options,
    			id: create_fragment$7.name
    		});
    	}

    	get path() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set path(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get component() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set component(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /**
     * A link action that can be added to <a href=""> tags rather
     * than using the <Link> component.
     *
     * Example:
     * ```html
     * <a href="/post/{postId}" use:link>{post.title}</a>
     * ```
     */
    function link(node) {
      function onClick(event) {
        const anchor = event.currentTarget;

        if (
          anchor.target === "" &&
          hostMatches(anchor) &&
          shouldNavigate(event)
        ) {
          event.preventDefault();
          navigate(anchor.pathname + anchor.search, { replace: anchor.hasAttribute("replace") });
        }
      }

      node.addEventListener("click", onClick);

      return {
        destroy() {
          node.removeEventListener("click", onClick);
        }
      };
    }

    /* src/widgets/Header.svelte generated by Svelte v3.46.4 */

    const file$5 = "src/widgets/Header.svelte";

    function create_fragment$6(ctx) {
    	let link;
    	let html;
    	let t0;
    	let main;
    	let div1;
    	let a0;
    	let img;
    	let img_src_value;
    	let t1;
    	let a1;
    	let t2;
    	let t3;
    	let a2;
    	let t4;
    	let t5;
    	let div0;
    	let form;
    	let input;
    	let t6;
    	let button;
    	let i;
    	let form_action_value;

    	const block = {
    		c: function create() {
    			link = element("link");
    			html = element("html");
    			t0 = space();
    			main = element("main");
    			div1 = element("div");
    			a0 = element("a");
    			img = element("img");
    			t1 = space();
    			a1 = element("a");
    			t2 = text(" JAV ");
    			t3 = space();
    			a2 = element("a");
    			t4 = text(" UAV ");
    			t5 = space();
    			div0 = element("div");
    			form = element("form");
    			input = element("input");
    			t6 = space();
    			button = element("button");
    			i = element("i");
    			attr_dev(link, "rel", "stylesheet");
    			attr_dev(link, "href", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
    			attr_dev(link, "class", "svelte-1lbqpdk");
    			add_location(link, file$5, 5, 2, 96);
    			attr_dev(html, "lang", "en");
    			attr_dev(html, "class", "svelte-1lbqpdk");
    			add_location(html, file$5, 6, 2, 212);
    			attr_dev(img, "id", "logo");
    			if (!src_url_equal(img.src, img_src_value = "/logo.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "UJAV");
    			attr_dev(img, "class", "svelte-1lbqpdk");
    			add_location(img, file$5, 12, 6, 300);
    			attr_dev(a0, "href", "/");
    			attr_dev(a0, "class", "svelte-1lbqpdk");
    			add_location(a0, file$5, 11, 4, 281);
    			attr_dev(a1, "href", "/jav");
    			attr_dev(a1, "class", "option svelte-1lbqpdk");
    			set_style(a1, "color", /*isUav*/ ctx[0] ? '' : '#f48f51');
    			add_location(a1, file$5, 14, 4, 357);
    			attr_dev(a2, "href", "/uav");
    			attr_dev(a2, "class", "option svelte-1lbqpdk");
    			set_style(a2, "color", /*isUav*/ ctx[0] ? '#f48f51' : '');
    			add_location(a2, file$5, 15, 4, 451);
    			attr_dev(input, "type", "text");
    			attr_dev(input, "placeholder", "Search...");
    			attr_dev(input, "name", "search");
    			attr_dev(input, "class", "svelte-1lbqpdk");
    			add_location(input, file$5, 18, 8, 640);
    			attr_dev(i, "class", "fa fa-search svelte-1lbqpdk");
    			add_location(i, file$5, 19, 32, 730);
    			attr_dev(button, "type", "submit");
    			attr_dev(button, "class", "svelte-1lbqpdk");
    			add_location(button, file$5, 19, 10, 708);
    			attr_dev(form, "action", form_action_value = "/" + (/*isUav*/ ctx[0] ? 'uav' : 'jav') + "/page/1");
    			attr_dev(form, "class", "svelte-1lbqpdk");
    			add_location(form, file$5, 17, 8, 584);
    			attr_dev(div0, "class", "search-container svelte-1lbqpdk");
    			add_location(div0, file$5, 16, 4, 545);
    			attr_dev(div1, "class", "topnav svelte-1lbqpdk");
    			add_location(div1, file$5, 10, 2, 256);
    			attr_dev(main, "class", "svelte-1lbqpdk");
    			add_location(main, file$5, 9, 0, 247);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			append_dev(document.head, link);
    			append_dev(document.head, html);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, main, anchor);
    			append_dev(main, div1);
    			append_dev(div1, a0);
    			append_dev(a0, img);
    			append_dev(div1, t1);
    			append_dev(div1, a1);
    			append_dev(a1, t2);
    			append_dev(div1, t3);
    			append_dev(div1, a2);
    			append_dev(a2, t4);
    			append_dev(div1, t5);
    			append_dev(div1, div0);
    			append_dev(div0, form);
    			append_dev(form, input);
    			append_dev(form, t6);
    			append_dev(form, button);
    			append_dev(button, i);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*isUav*/ 1) {
    				set_style(a1, "color", /*isUav*/ ctx[0] ? '' : '#f48f51');
    			}

    			if (dirty & /*isUav*/ 1) {
    				set_style(a2, "color", /*isUav*/ ctx[0] ? '#f48f51' : '');
    			}

    			if (dirty & /*isUav*/ 1 && form_action_value !== (form_action_value = "/" + (/*isUav*/ ctx[0] ? 'uav' : 'jav') + "/page/1")) {
    				attr_dev(form, "action", form_action_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			detach_dev(link);
    			detach_dev(html);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(main);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Header', slots, []);
    	let { isUav = window.location.href.includes('/uav') } = $$props;
    	const writable_props = ['isUav'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('isUav' in $$props) $$invalidate(0, isUav = $$props.isUav);
    	};

    	$$self.$capture_state = () => ({ isUav });

    	$$self.$inject_state = $$props => {
    		if ('isUav' in $$props) $$invalidate(0, isUav = $$props.isUav);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [isUav];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { isUav: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get isUav() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isUav(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/widgets/Footer.svelte generated by Svelte v3.46.4 */

    const file$4 = "src/widgets/Footer.svelte";

    function create_fragment$5(ctx) {
    	let main;
    	let div0;
    	let h4;
    	let t0;
    	let a;
    	let t2;
    	let ul;
    	let li0;
    	let p0;
    	let t4;
    	let li1;
    	let p1;
    	let t6;
    	let li2;
    	let p2;
    	let t8;
    	let li3;
    	let p3;
    	let t10;
    	let div1;

    	const block = {
    		c: function create() {
    			main = element("main");
    			div0 = element("div");
    			h4 = element("h4");
    			t0 = text("Telegram: ");
    			a = element("a");
    			a.textContent = "https://t.me/+b26KKnyfTuxmOGE9";
    			t2 = space();
    			ul = element("ul");
    			li0 = element("li");
    			p0 = element("p");
    			p0.textContent = "The greatest glory in living lies not in never falling, but in rising every time we fall - Nelson Mandela";
    			t4 = space();
    			li1 = element("li");
    			p1 = element("p");
    			p1.textContent = "The way to get started is to quit talking and begin doing - Walt Disney";
    			t6 = space();
    			li2 = element("li");
    			p2 = element("p");
    			p2.textContent = "If life were predictable it would cease to be life, and be without flavor - Eleanor Roosevelt";
    			t8 = space();
    			li3 = element("li");
    			p3 = element("p");
    			p3.textContent = "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success - James Cameron";
    			t10 = space();
    			div1 = element("div");
    			div1.textContent = "Terms of Use: This Website Is For People 18 And Over Only";
    			attr_dev(a, "href", "https://t.me/ujav_xyz");
    			add_location(a, file$4, 6, 22, 73);
    			add_location(h4, file$4, 6, 8, 59);
    			add_location(p0, file$4, 8, 16, 174);
    			add_location(li0, file$4, 8, 12, 170);
    			add_location(p1, file$4, 9, 16, 308);
    			add_location(li1, file$4, 9, 12, 304);
    			add_location(p2, file$4, 10, 16, 408);
    			add_location(li2, file$4, 10, 12, 404);
    			add_location(p3, file$4, 11, 16, 530);
    			add_location(li3, file$4, 11, 12, 526);
    			add_location(ul, file$4, 7, 8, 153);
    			attr_dev(div0, "id", "contact");
    			attr_dev(div0, "class", "svelte-1sqlycp");
    			add_location(div0, file$4, 5, 4, 32);
    			attr_dev(div1, "id", "term");
    			attr_dev(div1, "class", "svelte-1sqlycp");
    			add_location(div1, file$4, 15, 4, 692);
    			add_location(main, file$4, 4, 0, 21);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div0);
    			append_dev(div0, h4);
    			append_dev(h4, t0);
    			append_dev(h4, a);
    			append_dev(div0, t2);
    			append_dev(div0, ul);
    			append_dev(ul, li0);
    			append_dev(li0, p0);
    			append_dev(ul, t4);
    			append_dev(ul, li1);
    			append_dev(li1, p1);
    			append_dev(ul, t6);
    			append_dev(ul, li2);
    			append_dev(li2, p2);
    			append_dev(ul, t8);
    			append_dev(ul, li3);
    			append_dev(li3, p3);
    			append_dev(main, t10);
    			append_dev(main, div1);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Footer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src/pages/HomePage.svelte generated by Svelte v3.46.4 */
    const file$3 = "src/pages/HomePage.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[15] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[18] = list[i];
    	return child_ctx;
    }

    // (79:10) {#if video.actor != undefined}
    function create_if_block_1$2(ctx) {
    	let p2;
    	let t_value = /*video*/ ctx[18].actor + "";
    	let t;

    	const block = {
    		c: function create() {
    			p2 = element("p2");
    			t = text(t_value);
    			attr_dev(p2, "id", "actorName");
    			attr_dev(p2, "class", "svelte-1b654du");
    			add_location(p2, file$3, 79, 12, 2519);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p2, anchor);
    			append_dev(p2, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*videos*/ 1 && t_value !== (t_value = /*video*/ ctx[18].actor + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(79:10) {#if video.actor != undefined}",
    		ctx
    	});

    	return block;
    }

    // (70:4) {#each videos as video}
    function create_each_block_1(ctx) {
    	let a;
    	let div;
    	let img;
    	let img_src_value;
    	let t0;
    	let p1;

    	let t1_value = (/*isUav*/ ctx[4]
    	? /*video*/ ctx[18].title
    	: /*video*/ ctx[18].title.split(' ')[0]) + "";

    	let t1;
    	let t2;
    	let br;
    	let t3;
    	let t4;
    	let a_href_value;
    	let mounted;
    	let dispose;
    	let if_block = /*video*/ ctx[18].actor != undefined && create_if_block_1$2(ctx);

    	const block = {
    		c: function create() {
    			a = element("a");
    			div = element("div");
    			img = element("img");
    			t0 = space();
    			p1 = element("p1");
    			t1 = text(t1_value);
    			t2 = space();
    			br = element("br");
    			t3 = space();
    			if (if_block) if_block.c();
    			t4 = space();
    			attr_dev(img, "id", "actorImage");
    			if (!src_url_equal(img.src, img_src_value = /*video*/ ctx[18].icon_link)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "profile image");
    			attr_dev(img, "style", /*isUav*/ ctx[4] ? 'height: 7rem' : '');
    			attr_dev(img, "class", "svelte-1b654du");
    			add_location(img, file$3, 73, 10, 2241);
    			attr_dev(p1, "class", "title svelte-1b654du");
    			add_location(p1, file$3, 76, 10, 2377);
    			add_location(br, file$3, 77, 10, 2460);
    			attr_dev(div, "class", "container svelte-1b654du");
    			add_location(div, file$3, 71, 8, 2151);
    			attr_dev(a, "href", a_href_value = "/play/" + /*video*/ ctx[18].code);
    			attr_dev(a, "class", "svelte-1b654du");
    			add_location(a, file$3, 70, 6, 2104);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, div);
    			append_dev(div, img);
    			append_dev(div, t0);
    			append_dev(div, p1);
    			append_dev(p1, t1);
    			append_dev(div, t2);
    			append_dev(div, br);
    			append_dev(div, t3);
    			if (if_block) if_block.m(div, null);
    			append_dev(a, t4);

    			if (!mounted) {
    				dispose = action_destroyer(link.call(null, a));
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*videos*/ 1 && !src_url_equal(img.src, img_src_value = /*video*/ ctx[18].icon_link)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*videos*/ 1 && t1_value !== (t1_value = (/*isUav*/ ctx[4]
    			? /*video*/ ctx[18].title
    			: /*video*/ ctx[18].title.split(' ')[0]) + "")) set_data_dev(t1, t1_value);

    			if (/*video*/ ctx[18].actor != undefined) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_1$2(ctx);
    					if_block.c();
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*videos*/ 1 && a_href_value !== (a_href_value = "/play/" + /*video*/ ctx[18].code)) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if (if_block) if_block.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(70:4) {#each videos as video}",
    		ctx
    	});

    	return block;
    }

    // (88:2) {#if videos.length != 0}
    function create_if_block$2(ctx) {
    	let div;
    	let a0;
    	let t0;
    	let a0_href_value;
    	let t1;
    	let t2;
    	let a1;
    	let t3;
    	let a1_href_value;
    	let each_value = /*pages*/ ctx[3];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			a0 = element("a");
    			t0 = text("«");
    			t1 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			a1 = element("a");
    			t3 = text("»");

    			attr_dev(a0, "href", a0_href_value = "" + (baseUrl$1 + /*paramsByPage*/ ctx[5](/*startPage*/ ctx[8] - /*length*/ ctx[2] < 0
    			? /*maxPage*/ ctx[1] - /*length*/ ctx[2] + 1
    			: /*startPage*/ ctx[8] - /*length*/ ctx[2])));

    			attr_dev(a0, "class", "svelte-1b654du");
    			add_location(a0, file$3, 89, 6, 2707);

    			attr_dev(a1, "href", a1_href_value = "" + (baseUrl$1 + /*paramsByPage*/ ctx[5](/*startPage*/ ctx[8] + /*length*/ ctx[2] > /*maxPage*/ ctx[1]
    			? 1
    			: /*startPage*/ ctx[8] + /*length*/ ctx[2])));

    			attr_dev(a1, "class", "svelte-1b654du");
    			add_location(a1, file$3, 94, 6, 3015);
    			attr_dev(div, "class", "pagination svelte-1b654du");
    			add_location(div, file$3, 88, 4, 2676);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, a0);
    			append_dev(a0, t0);
    			append_dev(div, t1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			append_dev(div, t2);
    			append_dev(div, a1);
    			append_dev(a1, t3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*length, maxPage*/ 6 && a0_href_value !== (a0_href_value = "" + (baseUrl$1 + /*paramsByPage*/ ctx[5](/*startPage*/ ctx[8] - /*length*/ ctx[2] < 0
    			? /*maxPage*/ ctx[1] - /*length*/ ctx[2] + 1
    			: /*startPage*/ ctx[8] - /*length*/ ctx[2])))) {
    				attr_dev(a0, "href", a0_href_value);
    			}

    			if (dirty & /*baseUrl, paramsByPage, calcPage, pages, currentPage*/ 232) {
    				each_value = /*pages*/ ctx[3];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, t2);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*length, maxPage*/ 6 && a1_href_value !== (a1_href_value = "" + (baseUrl$1 + /*paramsByPage*/ ctx[5](/*startPage*/ ctx[8] + /*length*/ ctx[2] > /*maxPage*/ ctx[1]
    			? 1
    			: /*startPage*/ ctx[8] + /*length*/ ctx[2])))) {
    				attr_dev(a1, "href", a1_href_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(88:2) {#if videos.length != 0}",
    		ctx
    	});

    	return block;
    }

    // (91:6) {#each pages as page}
    function create_each_block$1(ctx) {
    	let a;
    	let t_value = /*calcPage*/ ctx[6](/*page*/ ctx[15]) + "";
    	let t;
    	let a_href_value;

    	const block = {
    		c: function create() {
    			a = element("a");
    			t = text(t_value);
    			attr_dev(a, "href", a_href_value = "" + (baseUrl$1 + /*paramsByPage*/ ctx[5](/*calcPage*/ ctx[6](/*page*/ ctx[15]))));
    			attr_dev(a, "class", "svelte-1b654du");
    			toggle_class(a, "active", /*page*/ ctx[15] == /*currentPage*/ ctx[7]);
    			toggle_class(a, "small-text", /*page*/ ctx[15] > 100);
    			add_location(a, file$3, 91, 8, 2849);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*pages*/ 8 && t_value !== (t_value = /*calcPage*/ ctx[6](/*page*/ ctx[15]) + "")) set_data_dev(t, t_value);

    			if (dirty & /*pages*/ 8 && a_href_value !== (a_href_value = "" + (baseUrl$1 + /*paramsByPage*/ ctx[5](/*calcPage*/ ctx[6](/*page*/ ctx[15]))))) {
    				attr_dev(a, "href", a_href_value);
    			}

    			if (dirty & /*pages, currentPage*/ 136) {
    				toggle_class(a, "active", /*page*/ ctx[15] == /*currentPage*/ ctx[7]);
    			}

    			if (dirty & /*pages*/ 8) {
    				toggle_class(a, "small-text", /*page*/ ctx[15] > 100);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(91:6) {#each pages as page}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let main;
    	let header;
    	let t0;
    	let div;
    	let t1;
    	let t2;
    	let footer;
    	let current;
    	header = new Header({ $$inline: true });
    	let each_value_1 = /*videos*/ ctx[0];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	let if_block = /*videos*/ ctx[0].length != 0 && create_if_block$2(ctx);
    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(header.$$.fragment);
    			t0 = space();
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t1 = space();
    			if (if_block) if_block.c();
    			t2 = space();
    			create_component(footer.$$.fragment);
    			attr_dev(div, "id", "wrapper-grid");

    			attr_dev(div, "style", /*isUav*/ ctx[4]
    			? 'grid-template-columns: repeat(auto-fit, 12rem)'
    			: '');

    			attr_dev(div, "class", "svelte-1b654du");
    			add_location(div, file$3, 67, 2, 1970);
    			add_location(main, file$3, 64, 0, 1948);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(header, main, null);
    			append_dev(main, t0);
    			append_dev(main, div);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			append_dev(main, t1);
    			if (if_block) if_block.m(main, null);
    			append_dev(main, t2);
    			mount_component(footer, main, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*videos, undefined, isUav*/ 17) {
    				each_value_1 = /*videos*/ ctx[0];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}

    			if (/*videos*/ ctx[0].length != 0) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					if_block.m(main, t2);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(header);
    			destroy_each(each_blocks, detaching);
    			if (if_block) if_block.d();
    			destroy_component(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const baseUrl$1 = 'https://ujav.xyz';

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('HomePage', slots, []);
    	let { id = 1 } = $$props;
    	const urlParams = new URLSearchParams(window.location.search);
    	const isUav = window.location.href.includes('/uav');
    	const head = isUav ? 'Free Porn' : 'Free Jav';
    	let title = `UJAV - ${head} Page: ${id}`;

    	if (urlParams.has('search')) {
    		const search = urlParams.get('search');
    		title = `UJAV - ${head} Page: ${id} Search: ${search}`;
    	}

    	document.title = title;
    	document.querySelector('meta[name="description"]').setAttribute("content", title);

    	const paramsByPage = page => {
    		let params;

    		if (isUav) {
    			params = `/uav/page/${page}`;
    		} else {
    			params = `/jav/page/${page}`;
    		}

    		if (urlParams.has('search')) {
    			const search = urlParams.get('search');
    			params += `?search=${search}`;
    		}

    		return params;
    	};

    	const params = paramsByPage(id);
    	let videos = [];
    	let maxPage = 0;

    	const calcPage = page => {
    		return page > maxPage ? page % maxPage : page;
    	};

    	const request = new XMLHttpRequest();
    	const currentPage = id;
    	let length = 6;
    	const startPage = currentPage - currentPage % length + 1;
    	let pages = [];

    	request.onload = () => {
    		const response = JSON.parse(request.response);
    		$$invalidate(0, videos = response.data);
    		$$invalidate(1, maxPage = response.max_page);
    		$$invalidate(2, length = Math.max(1, Math.min(length, maxPage)));
    		$$invalidate(3, pages = Array.from({ length }, (_, i) => startPage + i));

    		if (maxPage < id) {
    			window.location.href = `${baseUrl$1}/${paramsByPage(maxPage)}`;
    		}
    	};

    	request.open('GET', `${baseUrl$1}/api${params}`, true);
    	request.setRequestHeader('Content-type', 'application/json');
    	request.send();
    	const writable_props = ['id'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<HomePage> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('id' in $$props) $$invalidate(9, id = $$props.id);
    	};

    	$$self.$capture_state = () => ({
    		Header,
    		Footer,
    		link,
    		id,
    		baseUrl: baseUrl$1,
    		urlParams,
    		isUav,
    		head,
    		title,
    		paramsByPage,
    		params,
    		videos,
    		maxPage,
    		calcPage,
    		request,
    		currentPage,
    		length,
    		startPage,
    		pages
    	});

    	$$self.$inject_state = $$props => {
    		if ('id' in $$props) $$invalidate(9, id = $$props.id);
    		if ('title' in $$props) title = $$props.title;
    		if ('videos' in $$props) $$invalidate(0, videos = $$props.videos);
    		if ('maxPage' in $$props) $$invalidate(1, maxPage = $$props.maxPage);
    		if ('length' in $$props) $$invalidate(2, length = $$props.length);
    		if ('pages' in $$props) $$invalidate(3, pages = $$props.pages);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		videos,
    		maxPage,
    		length,
    		pages,
    		isUav,
    		paramsByPage,
    		calcPage,
    		currentPage,
    		startPage,
    		id
    	];
    }

    class HomePage extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { id: 9 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "HomePage",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get id() {
    		throw new Error("<HomePage>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<HomePage>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/widgets/FluidPlayer.svelte generated by Svelte v3.46.4 */

    const { console: console_1 } = globals;
    const file$2 = "src/widgets/FluidPlayer.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	return child_ctx;
    }

    // (12:4) {#if sources != undefined && sources instanceof Array}
    function create_if_block_4(ctx) {
    	let each_1_anchor;
    	let each_value = /*sources*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*sources*/ 1) {
    				each_value = /*sources*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(12:4) {#if sources != undefined && sources instanceof Array}",
    		ctx
    	});

    	return block;
    }

    // (14:12) {#if source.label == '480p'}
    function create_if_block_7(ctx) {
    	let source;
    	let source_src_value;

    	const block = {
    		c: function create() {
    			source = element("source");
    			if (!src_url_equal(source.src, source_src_value = /*sources*/ ctx[0]['480p'])) attr_dev(source, "src", source_src_value);
    			attr_dev(source, "title", "480p");
    			attr_dev(source, "type", "video/mp4");
    			add_location(source, file$2, 14, 16, 586);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, source, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*sources*/ 1 && !src_url_equal(source.src, source_src_value = /*sources*/ ctx[0]['480p'])) {
    				attr_dev(source, "src", source_src_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(source);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_7.name,
    		type: "if",
    		source: "(14:12) {#if source.label == '480p'}",
    		ctx
    	});

    	return block;
    }

    // (17:12) {#if source.label == '720p'}
    function create_if_block_6(ctx) {
    	let source;
    	let source_src_value;

    	const block = {
    		c: function create() {
    			source = element("source");
    			attr_dev(source, "data-fluid-hd", "");
    			if (!src_url_equal(source.src, source_src_value = /*sources*/ ctx[0]['720p'])) attr_dev(source, "src", source_src_value);
    			attr_dev(source, "title", "720p");
    			attr_dev(source, "type", "video/mp4");
    			add_location(source, file$2, 17, 16, 724);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, source, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*sources*/ 1 && !src_url_equal(source.src, source_src_value = /*sources*/ ctx[0]['720p'])) {
    				attr_dev(source, "src", source_src_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(source);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6.name,
    		type: "if",
    		source: "(17:12) {#if source.label == '720p'}",
    		ctx
    	});

    	return block;
    }

    // (20:12) {#if source.label == '1080p'}
    function create_if_block_5(ctx) {
    	let source;
    	let source_src_value;

    	const block = {
    		c: function create() {
    			source = element("source");
    			attr_dev(source, "data-fluid-hd", "");
    			if (!src_url_equal(source.src, source_src_value = /*sources*/ ctx[0]['1080p'])) attr_dev(source, "src", source_src_value);
    			attr_dev(source, "title", "1080p");
    			attr_dev(source, "type", "video/mp4");
    			add_location(source, file$2, 20, 16, 877);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, source, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*sources*/ 1 && !src_url_equal(source.src, source_src_value = /*sources*/ ctx[0]['1080p'])) {
    				attr_dev(source, "src", source_src_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(source);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(20:12) {#if source.label == '1080p'}",
    		ctx
    	});

    	return block;
    }

    // (13:8) {#each sources as source}
    function create_each_block(ctx) {
    	let if_block0_anchor;
    	let if_block1_anchor;
    	let if_block2_anchor;
    	let if_block0 = /*source*/ ctx[5].label == '480p' && create_if_block_7(ctx);
    	let if_block1 = /*source*/ ctx[5].label == '720p' && create_if_block_6(ctx);
    	let if_block2 = /*source*/ ctx[5].label == '1080p' && create_if_block_5(ctx);

    	const block = {
    		c: function create() {
    			if (if_block0) if_block0.c();
    			if_block0_anchor = empty();
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty();
    			if (if_block2) if_block2.c();
    			if_block2_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, if_block0_anchor, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, if_block1_anchor, anchor);
    			if (if_block2) if_block2.m(target, anchor);
    			insert_dev(target, if_block2_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (/*source*/ ctx[5].label == '480p') {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_7(ctx);
    					if_block0.c();
    					if_block0.m(if_block0_anchor.parentNode, if_block0_anchor);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*source*/ ctx[5].label == '720p') {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_6(ctx);
    					if_block1.c();
    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (/*source*/ ctx[5].label == '1080p') {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);
    				} else {
    					if_block2 = create_if_block_5(ctx);
    					if_block2.c();
    					if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
    				}
    			} else if (if_block2) {
    				if_block2.d(1);
    				if_block2 = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(if_block0_anchor);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(if_block1_anchor);
    			if (if_block2) if_block2.d(detaching);
    			if (detaching) detach_dev(if_block2_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(13:8) {#each sources as source}",
    		ctx
    	});

    	return block;
    }

    // (26:4) {#if sources['360p'] != undefined && sources['360p'] != ''}
    function create_if_block_3(ctx) {
    	let source;
    	let source_src_value;

    	const block = {
    		c: function create() {
    			source = element("source");
    			if (!src_url_equal(source.src, source_src_value = /*sources*/ ctx[0]['360p'])) attr_dev(source, "src", source_src_value);
    			attr_dev(source, "title", "360p");
    			attr_dev(source, "type", "video/mp4");
    			add_location(source, file$2, 26, 8, 1077);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, source, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*sources*/ 1 && !src_url_equal(source.src, source_src_value = /*sources*/ ctx[0]['360p'])) {
    				attr_dev(source, "src", source_src_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(source);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(26:4) {#if sources['360p'] != undefined && sources['360p'] != ''}",
    		ctx
    	});

    	return block;
    }

    // (29:4) {#if sources['480p'] != undefined && sources['480p'] != ''}
    function create_if_block_2$1(ctx) {
    	let source;
    	let source_src_value;

    	const block = {
    		c: function create() {
    			source = element("source");
    			if (!src_url_equal(source.src, source_src_value = /*sources*/ ctx[0]['480p'])) attr_dev(source, "src", source_src_value);
    			attr_dev(source, "title", "360p");
    			attr_dev(source, "type", "video/mp4");
    			add_location(source, file$2, 29, 8, 1222);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, source, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*sources*/ 1 && !src_url_equal(source.src, source_src_value = /*sources*/ ctx[0]['480p'])) {
    				attr_dev(source, "src", source_src_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(source);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(29:4) {#if sources['480p'] != undefined && sources['480p'] != ''}",
    		ctx
    	});

    	return block;
    }

    // (32:4) {#if sources['720p'] != undefined && sources['720p'] != ''}
    function create_if_block_1$1(ctx) {
    	let source;
    	let source_src_value;

    	const block = {
    		c: function create() {
    			source = element("source");
    			attr_dev(source, "data-fluid-hd", "");
    			if (!src_url_equal(source.src, source_src_value = /*sources*/ ctx[0]['720p'])) attr_dev(source, "src", source_src_value);
    			attr_dev(source, "title", "720p");
    			attr_dev(source, "type", "video/mp4");
    			add_location(source, file$2, 32, 8, 1367);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, source, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*sources*/ 1 && !src_url_equal(source.src, source_src_value = /*sources*/ ctx[0]['720p'])) {
    				attr_dev(source, "src", source_src_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(source);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(32:4) {#if sources['720p'] != undefined && sources['720p'] != ''}",
    		ctx
    	});

    	return block;
    }

    // (35:4) {#if sources['1080p'] != undefined && sources['1080p'] != ''}
    function create_if_block$1(ctx) {
    	let source;
    	let source_src_value;

    	const block = {
    		c: function create() {
    			source = element("source");
    			attr_dev(source, "data-fluid-hd", "");
    			if (!src_url_equal(source.src, source_src_value = /*sources*/ ctx[0]['1080p'])) attr_dev(source, "src", source_src_value);
    			attr_dev(source, "title", "1080p");
    			attr_dev(source, "type", "video/mp4");
    			add_location(source, file$2, 35, 8, 1528);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, source, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*sources*/ 1 && !src_url_equal(source.src, source_src_value = /*sources*/ ctx[0]['1080p'])) {
    				attr_dev(source, "src", source_src_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(source);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(35:4) {#if sources['1080p'] != undefined && sources['1080p'] != ''}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let link;
    	let script_1;
    	let script_1_src_value;
    	let style;
    	let t1;
    	let main;
    	let video;
    	let if_block0_anchor;
    	let if_block1_anchor;
    	let if_block2_anchor;
    	let if_block3_anchor;
    	let if_block0 = /*sources*/ ctx[0] != undefined && /*sources*/ ctx[0] instanceof Array && create_if_block_4(ctx);
    	let if_block1 = /*sources*/ ctx[0]['360p'] != undefined && /*sources*/ ctx[0]['360p'] != '' && create_if_block_3(ctx);
    	let if_block2 = /*sources*/ ctx[0]['480p'] != undefined && /*sources*/ ctx[0]['480p'] != '' && create_if_block_2$1(ctx);
    	let if_block3 = /*sources*/ ctx[0]['720p'] != undefined && /*sources*/ ctx[0]['720p'] != '' && create_if_block_1$1(ctx);
    	let if_block4 = /*sources*/ ctx[0]['1080p'] != undefined && /*sources*/ ctx[0]['1080p'] != '' && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			link = element("link");
    			script_1 = element("script");
    			style = element("style");
    			style.textContent = "#video{width:100%;height: auto;object-fit:scale-down;}";
    			t1 = space();
    			main = element("main");
    			video = element("video");
    			if (if_block0) if_block0.c();
    			if_block0_anchor = empty();
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty();
    			if (if_block2) if_block2.c();
    			if_block2_anchor = empty();
    			if (if_block3) if_block3.c();
    			if_block3_anchor = empty();
    			if (if_block4) if_block4.c();
    			attr_dev(link, "rel", "stylesheet");
    			attr_dev(link, "href", "https://cdn.fluidplayer.com/v2/current/fluidplayer.min.css");
    			attr_dev(link, "type", "text/css");
    			add_location(link, file$2, 1, 4, 18);
    			if (!src_url_equal(script_1.src, script_1_src_value = "https://cdn.fluidplayer.com/v2/current/fluidplayer.min.js")) attr_dev(script_1, "src", script_1_src_value);
    			add_location(script_1, file$2, 2, 4, 130);
    			add_location(style, file$2, 3, 4, 235);
    			attr_dev(video, "id", "video");
    			attr_dev(video, "poster", /*poster*/ ctx[1]);
    			video.controls = "";
    			add_location(video, file$2, 10, 4, 396);
    			add_location(main, file$2, 8, 0, 335);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			append_dev(document.head, link);
    			append_dev(document.head, script_1);
    			/*script_1_binding*/ ctx[3](script_1);
    			append_dev(document.head, style);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, main, anchor);
    			append_dev(main, video);
    			if (if_block0) if_block0.m(video, null);
    			append_dev(video, if_block0_anchor);
    			if (if_block1) if_block1.m(video, null);
    			append_dev(video, if_block1_anchor);
    			if (if_block2) if_block2.m(video, null);
    			append_dev(video, if_block2_anchor);
    			if (if_block3) if_block3.m(video, null);
    			append_dev(video, if_block3_anchor);
    			if (if_block4) if_block4.m(video, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*sources*/ ctx[0] != undefined && /*sources*/ ctx[0] instanceof Array) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_4(ctx);
    					if_block0.c();
    					if_block0.m(video, if_block0_anchor);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*sources*/ ctx[0]['360p'] != undefined && /*sources*/ ctx[0]['360p'] != '') {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_3(ctx);
    					if_block1.c();
    					if_block1.m(video, if_block1_anchor);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (/*sources*/ ctx[0]['480p'] != undefined && /*sources*/ ctx[0]['480p'] != '') {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);
    				} else {
    					if_block2 = create_if_block_2$1(ctx);
    					if_block2.c();
    					if_block2.m(video, if_block2_anchor);
    				}
    			} else if (if_block2) {
    				if_block2.d(1);
    				if_block2 = null;
    			}

    			if (/*sources*/ ctx[0]['720p'] != undefined && /*sources*/ ctx[0]['720p'] != '') {
    				if (if_block3) {
    					if_block3.p(ctx, dirty);
    				} else {
    					if_block3 = create_if_block_1$1(ctx);
    					if_block3.c();
    					if_block3.m(video, if_block3_anchor);
    				}
    			} else if (if_block3) {
    				if_block3.d(1);
    				if_block3 = null;
    			}

    			if (/*sources*/ ctx[0]['1080p'] != undefined && /*sources*/ ctx[0]['1080p'] != '') {
    				if (if_block4) {
    					if_block4.p(ctx, dirty);
    				} else {
    					if_block4 = create_if_block$1(ctx);
    					if_block4.c();
    					if_block4.m(video, null);
    				}
    			} else if (if_block4) {
    				if_block4.d(1);
    				if_block4 = null;
    			}

    			if (dirty & /*poster*/ 2) {
    				attr_dev(video, "poster", /*poster*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			detach_dev(link);
    			detach_dev(script_1);
    			/*script_1_binding*/ ctx[3](null);
    			detach_dev(style);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(main);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    			if (if_block3) if_block3.d();
    			if (if_block4) if_block4.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('FluidPlayer', slots, []);
    	let { sources } = $$props;
    	let { poster } = $$props;
    	const dispatch = createEventDispatcher();
    	let script;

    	onMount(async () => {
    		script.addEventListener('load', () => {
    			dispatch('loaded');

    			fluidPlayer("video", {
    				layoutControls: {
    					preload: true,
    					allowDownload: true,
    					primaryColor: "#f48f51",
    					controlBar: {
    						autoHide: true,
    						autoHideTimeout: 5,
    						animated: true
    					}
    				}
    			});
    		});

    		script.addEventListener('error', event => {
    			console.error("something went wrong", event);
    			dispatch('error');
    		});
    	});

    	const writable_props = ['sources', 'poster'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<FluidPlayer> was created with unknown prop '${key}'`);
    	});

    	function script_1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			script = $$value;
    			$$invalidate(2, script);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('sources' in $$props) $$invalidate(0, sources = $$props.sources);
    		if ('poster' in $$props) $$invalidate(1, poster = $$props.poster);
    	};

    	$$self.$capture_state = () => ({
    		sources,
    		poster,
    		onMount,
    		createEventDispatcher,
    		dispatch,
    		script
    	});

    	$$self.$inject_state = $$props => {
    		if ('sources' in $$props) $$invalidate(0, sources = $$props.sources);
    		if ('poster' in $$props) $$invalidate(1, poster = $$props.poster);
    		if ('script' in $$props) $$invalidate(2, script = $$props.script);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [sources, poster, script, script_1_binding];
    }

    class FluidPlayer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { sources: 0, poster: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FluidPlayer",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*sources*/ ctx[0] === undefined && !('sources' in props)) {
    			console_1.warn("<FluidPlayer> was created without expected prop 'sources'");
    		}

    		if (/*poster*/ ctx[1] === undefined && !('poster' in props)) {
    			console_1.warn("<FluidPlayer> was created without expected prop 'poster'");
    		}
    	}

    	get sources() {
    		throw new Error("<FluidPlayer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set sources(value) {
    		throw new Error("<FluidPlayer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get poster() {
    		throw new Error("<FluidPlayer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set poster(value) {
    		throw new Error("<FluidPlayer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/widgets/SmartPlayer.svelte generated by Svelte v3.46.4 */

    const { document: document_1$1 } = globals;
    const file$1 = "src/widgets/SmartPlayer.svelte";

    function create_fragment$2(ctx) {
    	let style;
    	let t1;
    	let main;
    	let iframe;
    	let iframe_src_value;
    	let iframe_resize_listener;

    	const block = {
    		c: function create() {
    			style = element("style");
    			style.textContent = "#movieplay {\n            width: 100%;\n            height: 100%;\n        }\n        #source {\n            aspect-ratio: 192/108;\n            width: 100%;\n        }";
    			t1 = space();
    			main = element("main");
    			iframe = element("iframe");
    			add_location(style, file$1, 1, 4, 18);
    			attr_dev(iframe, "id", "source");
    			attr_dev(iframe, "height", /*dynamicHeight*/ ctx[2]());
    			if (!src_url_equal(iframe.src, iframe_src_value = "https://smartshare.tv/v/" + /*code*/ ctx[0])) attr_dev(iframe, "src", iframe_src_value);
    			attr_dev(iframe, "frameborder", "0");
    			iframe.allowFullscreen = true;
    			add_render_callback(() => /*iframe_elementresize_handler*/ ctx[3].call(iframe));
    			add_location(iframe, file$1, 25, 4, 532);
    			add_location(main, file$1, 23, 0, 471);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			append_dev(document_1$1.head, style);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, main, anchor);
    			append_dev(main, iframe);
    			iframe_resize_listener = add_resize_listener(iframe, /*iframe_elementresize_handler*/ ctx[3].bind(iframe));
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*code*/ 1 && !src_url_equal(iframe.src, iframe_src_value = "https://smartshare.tv/v/" + /*code*/ ctx[0])) {
    				attr_dev(iframe, "src", iframe_src_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			detach_dev(style);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(main);
    			iframe_resize_listener();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SmartPlayer', slots, []);
    	let { code } = $$props;
    	let offsetWidth;

    	const dynamicHeight = () => {
    		if (offsetWidth > 0) {
    			$$invalidate(1, offsetWidth = document.getElementById('source').offsetWidth);
    		}

    		return offsetWidth / 2;
    	};

    	const writable_props = ['code'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SmartPlayer> was created with unknown prop '${key}'`);
    	});

    	function iframe_elementresize_handler() {
    		offsetWidth = this.offsetWidth;
    		$$invalidate(1, offsetWidth);
    	}

    	$$self.$$set = $$props => {
    		if ('code' in $$props) $$invalidate(0, code = $$props.code);
    	};

    	$$self.$capture_state = () => ({ code, offsetWidth, dynamicHeight });

    	$$self.$inject_state = $$props => {
    		if ('code' in $$props) $$invalidate(0, code = $$props.code);
    		if ('offsetWidth' in $$props) $$invalidate(1, offsetWidth = $$props.offsetWidth);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [code, offsetWidth, dynamicHeight, iframe_elementresize_handler];
    }

    class SmartPlayer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { code: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SmartPlayer",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*code*/ ctx[0] === undefined && !('code' in props)) {
    			console.warn("<SmartPlayer> was created without expected prop 'code'");
    		}
    	}

    	get code() {
    		throw new Error("<SmartPlayer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set code(value) {
    		throw new Error("<SmartPlayer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/pages/VideoPlayerPage.svelte generated by Svelte v3.46.4 */

    const { document: document_1 } = globals;
    const file = "src/pages/VideoPlayerPage.svelte";

    // (39:8) {:else}
    function create_else_block(ctx) {
    	let current_block_type_index;
    	let if_block0;
    	let t0;
    	let div1;
    	let img;
    	let img_src_value;
    	let img_alt_value;
    	let t1;
    	let div0;
    	let p;
    	let t2_value = /*video*/ ctx[1].title + "";
    	let t2;
    	let t3;
    	let current;
    	const if_block_creators = [create_if_block_2, create_else_block_1];
    	const if_blocks = [];

    	function select_block_type_1(ctx, dirty) {
    		if (/*isUav*/ ctx[2]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type_1(ctx);
    	if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	let if_block1 = /*video*/ ctx[1].actor != undefined && create_if_block_1(ctx);

    	const block = {
    		c: function create() {
    			if_block0.c();
    			t0 = space();
    			div1 = element("div");
    			img = element("img");
    			t1 = space();
    			div0 = element("div");
    			p = element("p");
    			t2 = text(t2_value);
    			t3 = space();
    			if (if_block1) if_block1.c();
    			attr_dev(img, "id", "actorImage");
    			if (!src_url_equal(img.src, img_src_value = /*video*/ ctx[1].icon_link)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", img_alt_value = /*video*/ ctx[1].actor);
    			attr_dev(img, "style", /*isUav*/ ctx[2] ? "height: 6rem;" : "height: 12rem;");
    			attr_dev(img, "class", "svelte-1uk9qch");
    			add_location(img, file, 46, 16, 1582);
    			attr_dev(p, "class", "svelte-1uk9qch");
    			toggle_class(p, "small-text", /*video*/ ctx[1].title.length > 160);
    			add_location(p, file, 50, 20, 1784);
    			attr_dev(div0, "id", "text");
    			attr_dev(div0, "class", "svelte-1uk9qch");
    			add_location(div0, file, 49, 16, 1748);
    			attr_dev(div1, "id", "info");
    			attr_dev(div1, "class", "svelte-1uk9qch");
    			add_location(div1, file, 45, 12, 1550);
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, img);
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			append_dev(div0, p);
    			append_dev(p, t2);
    			append_dev(div0, t3);
    			if (if_block1) if_block1.m(div0, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if_block0.p(ctx, dirty);

    			if (!current || dirty & /*video*/ 2 && !src_url_equal(img.src, img_src_value = /*video*/ ctx[1].icon_link)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (!current || dirty & /*video*/ 2 && img_alt_value !== (img_alt_value = /*video*/ ctx[1].actor)) {
    				attr_dev(img, "alt", img_alt_value);
    			}

    			if ((!current || dirty & /*video*/ 2) && t2_value !== (t2_value = /*video*/ ctx[1].title + "")) set_data_dev(t2, t2_value);

    			if (dirty & /*video*/ 2) {
    				toggle_class(p, "small-text", /*video*/ ctx[1].title.length > 160);
    			}

    			if (/*video*/ ctx[1].actor != undefined) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_1(ctx);
    					if_block1.c();
    					if_block1.m(div0, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div1);
    			if (if_block1) if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(39:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (37:8) {#if video == undefined }
    function create_if_block(ctx) {
    	let h1;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Oops ! No content here";
    			attr_dev(h1, "class", "svelte-1uk9qch");
    			add_location(h1, file, 37, 12, 1305);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(37:8) {#if video == undefined }",
    		ctx
    	});

    	return block;
    }

    // (42:12) {:else}
    function create_else_block_1(ctx) {
    	let smartplayer;
    	let current;

    	smartplayer = new SmartPlayer({
    			props: { code: /*id*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(smartplayer.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(smartplayer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const smartplayer_changes = {};
    			if (dirty & /*id*/ 1) smartplayer_changes.code = /*id*/ ctx[0];
    			smartplayer.$set(smartplayer_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(smartplayer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(smartplayer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(smartplayer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(42:12) {:else}",
    		ctx
    	});

    	return block;
    }

    // (40:12) {#if isUav}
    function create_if_block_2(ctx) {
    	let fluidplayer;
    	let current;

    	fluidplayer = new FluidPlayer({
    			props: {
    				sources: /*video*/ ctx[1].files,
    				poster: /*video*/ ctx[1].image_link
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(fluidplayer.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(fluidplayer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const fluidplayer_changes = {};
    			if (dirty & /*video*/ 2) fluidplayer_changes.sources = /*video*/ ctx[1].files;
    			if (dirty & /*video*/ 2) fluidplayer_changes.poster = /*video*/ ctx[1].image_link;
    			fluidplayer.$set(fluidplayer_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(fluidplayer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(fluidplayer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(fluidplayer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(40:12) {#if isUav}",
    		ctx
    	});

    	return block;
    }

    // (52:20) {#if video.actor != undefined}
    function create_if_block_1(ctx) {
    	let a;
    	let p;
    	let t_value = /*video*/ ctx[1].actor + "";
    	let t;
    	let p_style_value;
    	let a_href_value;

    	const block = {
    		c: function create() {
    			a = element("a");
    			p = element("p");
    			t = text(t_value);
    			attr_dev(p, "id", "actorName");

    			attr_dev(p, "style", p_style_value = /*video*/ ctx[1].actor != ''
    			? "background-color: #5cc2f7;"
    			: "");

    			attr_dev(p, "class", "svelte-1uk9qch");
    			add_location(p, file, 53, 28, 1997);
    			attr_dev(a, "href", a_href_value = "/jav/page/1/?search=" + /*video*/ ctx[1].actor);
    			attr_dev(a, "class", "svelte-1uk9qch");
    			add_location(a, file, 52, 24, 1924);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, p);
    			append_dev(p, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*video*/ 2 && t_value !== (t_value = /*video*/ ctx[1].actor + "")) set_data_dev(t, t_value);

    			if (dirty & /*video*/ 2 && p_style_value !== (p_style_value = /*video*/ ctx[1].actor != ''
    			? "background-color: #5cc2f7;"
    			: "")) {
    				attr_dev(p, "style", p_style_value);
    			}

    			if (dirty & /*video*/ 2 && a_href_value !== (a_href_value = "/jav/page/1/?search=" + /*video*/ ctx[1].actor)) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(52:20) {#if video.actor != undefined}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let link0;
    	let link1;
    	let t0;
    	let main;
    	let header;
    	let t1;
    	let div;
    	let current_block_type_index;
    	let if_block;
    	let t2;
    	let footer;
    	let current;

    	header = new Header({
    			props: { isUav: /*isUav*/ ctx[2] },
    			$$inline: true
    		});

    	const if_block_creators = [create_if_block, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*video*/ ctx[1] == undefined) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			link0 = element("link");
    			link1 = element("link");
    			t0 = space();
    			main = element("main");
    			create_component(header.$$.fragment);
    			t1 = space();
    			div = element("div");
    			if_block.c();
    			t2 = space();
    			create_component(footer.$$.fragment);
    			attr_dev(link0, "rel", "stylesheet");
    			attr_dev(link0, "href", "https://cdn.jsdelivr.net/npm/@vime/core@^5/themes/default.css");
    			add_location(link0, file, 1, 4, 18);
    			attr_dev(link1, "rel", "stylesheet");
    			attr_dev(link1, "href", "https://cdn.jsdelivr.net/npm/@vime/core@^5/themes/light.css");
    			add_location(link1, file, 2, 4, 116);
    			attr_dev(div, "id", "content");
    			attr_dev(div, "class", "svelte-1uk9qch");
    			add_location(div, file, 35, 4, 1240);
    			add_location(main, file, 33, 0, 1207);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			append_dev(document_1.head, link0);
    			append_dev(document_1.head, link1);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, main, anchor);
    			mount_component(header, main, null);
    			append_dev(main, t1);
    			append_dev(main, div);
    			if_blocks[current_block_type_index].m(div, null);
    			append_dev(main, t2);
    			mount_component(footer, main, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(div, null);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(if_block);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(if_block);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			detach_dev(link0);
    			detach_dev(link1);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(main);
    			destroy_component(header);
    			if_blocks[current_block_type_index].d();
    			destroy_component(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const baseUrl = 'https://ujav.xyz';

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('VideoPlayerPage', slots, []);
    	let { id } = $$props;
    	let video;
    	const isUav = ('ce546aedbd70c4d6ca').length == id.length;
    	const request = new XMLHttpRequest();
    	let params;

    	if (isUav) {
    		params = `/uav/code/${id}`;
    	} else {
    		params = `/jav/code/${id}`;
    	}

    	request.onload = () => {
    		$$invalidate(1, video = JSON.parse(request.response));
    		document.title = (isUav ? 'Porn - ' : 'JAV - ') + video.title;
    		document.querySelector('meta[name="description"]').setAttribute("content", 'sex ' + 'jav ' + 'blacked ' + 'vixen ' + video.title);
    	};

    	request.open('GET', `${baseUrl}/api${params}`, true);
    	request.setRequestHeader('Content-type', 'application/json');
    	request.send();
    	const writable_props = ['id'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<VideoPlayerPage> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('id' in $$props) $$invalidate(0, id = $$props.id);
    	};

    	$$self.$capture_state = () => ({
    		Header,
    		Footer,
    		FluidPlayer,
    		SmartPlayer,
    		id,
    		baseUrl,
    		video,
    		isUav,
    		request,
    		params
    	});

    	$$self.$inject_state = $$props => {
    		if ('id' in $$props) $$invalidate(0, id = $$props.id);
    		if ('video' in $$props) $$invalidate(1, video = $$props.video);
    		if ('params' in $$props) params = $$props.params;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [id, video, isUav];
    }

    class VideoPlayerPage extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { id: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "VideoPlayerPage",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*id*/ ctx[0] === undefined && !('id' in props)) {
    			console.warn("<VideoPlayerPage> was created without expected prop 'id'");
    		}
    	}

    	get id() {
    		throw new Error("<VideoPlayerPage>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<VideoPlayerPage>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.46.4 */

    // (7:0) <Router>
    function create_default_slot(ctx) {
    	let route0;
    	let t0;
    	let route1;
    	let t1;
    	let route2;
    	let t2;
    	let route3;
    	let t3;
    	let route4;
    	let t4;
    	let route5;
    	let current;

    	route0 = new Route({
    			props: {
    				path: "/jav/page/:id",
    				component: HomePage
    			},
    			$$inline: true
    		});

    	route1 = new Route({
    			props: {
    				path: "/uav/page/:id",
    				component: HomePage
    			},
    			$$inline: true
    		});

    	route2 = new Route({
    			props: { path: "/uav", component: HomePage },
    			$$inline: true
    		});

    	route3 = new Route({
    			props: { path: "/jav", component: HomePage },
    			$$inline: true
    		});

    	route4 = new Route({
    			props: { path: "/", component: HomePage },
    			$$inline: true
    		});

    	route5 = new Route({
    			props: {
    				path: "/play/:id",
    				component: VideoPlayerPage
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(route0.$$.fragment);
    			t0 = space();
    			create_component(route1.$$.fragment);
    			t1 = space();
    			create_component(route2.$$.fragment);
    			t2 = space();
    			create_component(route3.$$.fragment);
    			t3 = space();
    			create_component(route4.$$.fragment);
    			t4 = space();
    			create_component(route5.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(route0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(route1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(route2, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(route3, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(route4, target, anchor);
    			insert_dev(target, t4, anchor);
    			mount_component(route5, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(route0.$$.fragment, local);
    			transition_in(route1.$$.fragment, local);
    			transition_in(route2.$$.fragment, local);
    			transition_in(route3.$$.fragment, local);
    			transition_in(route4.$$.fragment, local);
    			transition_in(route5.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(route0.$$.fragment, local);
    			transition_out(route1.$$.fragment, local);
    			transition_out(route2.$$.fragment, local);
    			transition_out(route3.$$.fragment, local);
    			transition_out(route4.$$.fragment, local);
    			transition_out(route5.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(route0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(route1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(route2, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(route3, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(route4, detaching);
    			if (detaching) detach_dev(t4);
    			destroy_component(route5, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(7:0) <Router>",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let router;
    	let current;

    	router = new Router({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(router.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(router, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const router_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				router_changes.$$scope = { dirty, ctx };
    			}

    			router.$set(router_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(router, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Router, Route, HomePage, VideoPlayerPage });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map

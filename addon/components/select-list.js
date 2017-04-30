import Ember from 'ember';

export default Ember.Component.extend({

    tagName: 'select',

    // possible passed-in values with their defaults:
    content: null,
    prompt: null,
    optionValuePath: null,
    optionLabelPath: null,
    required: false,
    title: null,
    action: function() {
        return this;
    }, // action to fire on change
    tabindex: -1,
    disabled: null,

    attributeBindings: ['tabindex', 'required', 'title', 'disabled'],

    // shadow the passed-in `value` to avoid
    // leaking changes to it via a 2-way binding
    _selection: Ember.computed.reads('value'),

    init() {
        this._super(...arguments);
        if (!this.get('content')) {
            this.set('content', []);
        }
    },

    change() {
        const value = Ember.$(this.element).val();
        this.set('value', value);
        // do callback
        const changeCallback = this.get('action');
        changeCallback(value);
    },

    didInsertElement() {
        var component = this;
        setTimeout(function() {
           if (!component.get('optionValuePath') || !component.get('value')) {
                component.set('value', Ember.$(component.element).val());
            }
        }, 1000);
    },
});

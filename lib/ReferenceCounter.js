!function() {
    'use strict';


    var   Class                     = require('ee-class')
        , log                       = require('ee-log')
        , type                      = require('ee-types')
        , ORMExtension              = require('related-extension')
        , referenceCounterSelector  = require('./ReferenceCounterSelector');


    var   thisContext
        , ReferenceCounterSelector
        , ORM;




    module.exports = new Class({
        inherits: ORMExtension


        // the plugins name
        , _name: 'related-reference-counter'



        , init: function init(options) {
            init.super.call(this);

            // store this context so we'll have acces in some
            // methods attached to the model
            thisContext = this;

            // prepare the selector
            if (!ReferenceCounterSelector) ReferenceCounterSelector = referenceCounterSelector(this);

            // make the selector available on the orm
            this.selectors.push(ReferenceCounterSelector);

            // store the columns
            this.storage = {};
        }






        /*
         * we have to add our locale queries (sub selects)
         */
        , onBeforePrepare: function(resource, definition) {
            var query = resource.getQuery()
                , map = {};


            if (query.order && query.order.length) {

                // find each instance of the distance selector, 
                // check if its inside the filter, create a subquery
                // if yes
                query.select.forEach(function(selection) {
                    if (selection instanceof ReferenceCounterSelector) {

                        // check if we are ordering the query by the selector
                        map[selection.alias] = true;
                    }
                }.bind(this));

                // make sure the order statment is not added to the group by statement
                query.order.forEach(function(order) {
                    if (map[order.property]) {
                        order.noGroup = true;
                        order.entity = null;
                    }
                });
            }
        }




        /*
         * checks if this extension should be applied to the
         * current model
         */
        , useOnModel: function(definition) {
            return true;
        }
    });
}();

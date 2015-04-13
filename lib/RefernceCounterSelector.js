!function() {

    var   Class             = require('ee-class')
        , log               = require('ee-log')
        , type              = require('ee-types')
        , RelatedSelector   = require('related-selector');


    /*
     * distance selector
     */


    module.exports = function(extension) {

        // the class needds to know 
        var ClassConstructor = new Class({
            inherits: RelatedSelector


            // the name this selector is using on 
            // the selector class of the orm
           , name: 'referenceCount'


            /**
             * store values passed by the user
             */
            , init: function init(options) {
                var path, index;

                init.super.call(this, options);

                if (!options.parameters || options.parameters.length < 1) throw new Error('The referenceCount extension requirees at least 1 parameter passed to it (entityId)!');
                
                path = options.parameters[0];
                index = path.lastIndexOf('.');

                if (index === -1) {
                    this.fieldName = path;
                    this.path = null;
                }
                else {
                    // join other entites...
                    this.id = path.substr(index+1);
                    this.path = path.substr(0, index);
                }
            }


            /**
             * render the selection
             */
            , render: function(select, parameters) {
                return 'COUNT('+parameters.escapeId(this.aliasEntityName)+'.'+parameters.escapeId(this.id)+') '+parameters.escapeId(this.alias);
            }



            /**
             * make sure all tables are joined correctly
             */
            , _joinEntites: function(queryBuilder, path) {
                if (path.length) this._joinEntites(queryBuilder.join(path[0], true), path.slice(1));
                else this.aliasEntityName = queryBuilder.getresource().getAliasName();
            }



            /**
             * prepare the selector
             */
            , prepare: function(queryBuidler) {
                // join tables
                this._joinEntites(queryBuidler, this.path.split('.'));
            }
        });
    
        
        // make sure the extension is installable!
        RelatedSelector.prepare(ClassConstructor, 'referenceCount');

        // return class
        return ClassConstructor;
    }
}();

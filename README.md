# related-reference-counter

Count references items on your entities.


[![npm](https://img.shields.io/npm/dm/related-reference-counter.svg?style=flat-square)](https://www.npmjs.com/package/related-reference-counter)
[![Travis](https://img.shields.io/travis/eventEmitter/related-reference-counter.svg?style=flat-square)](https://travis-ci.org/eventEmitter/related-reference-counter)
[![node](https://img.shields.io/node/v/related-reference-counter.svg?style=flat-square)](https://nodejs.org/)


## API
    
Get an related ORM instance

    var   RelatedORM = require('related')
        , RelatedReferenceCounter = require('related-reference-counter')

    var related = new RelatedORM(config);

Add the extension

    related.use(new RelatedReferenceCounter());


Count references on an entity


    related.event(
        [
              '*'
            , Related.select('childEventCount').referenceCount('childEvent.id')
        ], {
            childEventCount: Related.gt(1)
        }
    ).order('childEventCount').find().then().catch()




    select: childEventCount=referenceCount('childEvent.id')
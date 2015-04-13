

DROP SCHEMA IF EXISTS related_refcount_test CASCADE;
CREATE SCHEMA related_refcount_test;

CREATE TABLE related_refcount_test.venue (
      id                serial NOT NULL
    , name              varchar(100)
    , "lat"             decimal(10,2) NOT NULL
    , "lng"             decimal(10,2) NOT NULL
    , CONSTRAINT "pk_venue" PRIMARY KEY (id)
);


CREATE TABLE related_refcount_test.event (
      id                serial NOT NULL
    , id_venue          int
    , name              varchar(100)
    , CONSTRAINT "pk_event" PRIMARY KEY (id)
    , CONSTRAINT "fk_venue" FOREIGN KEY (id_venue) REFERENCES "related_refcount_test".venue ON UPDATE CASCADE ON DELETE CASCADE
);

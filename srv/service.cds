using { MyProject0711 as my } from '../db/schema';

using MyProject0711 from '../db/schema';

@path : '/service/MyProject0711'
service MyProject0711Service
{
    annotate Authors with @restrict :
    [
        { grant : [ 'READ' ], to : [ 'BooksRole' ] }
    ];

    annotate Books with @restrict :
    [
        { grant : [ 'READ', 'CREATE' ], to : [ 'BooksRole' ] },
        { grant : [ 'UPDATE' ], to : [ 'BooksRole' ], where : 'price > 50' },
        { grant : [ 'DELETE' ], to : [ 'BooksRole' ], where : 'price > 100 and stock < 5' }
    ];

    annotate BooksDraft with @restrict :
    [
        { grant : [ '*' ], to : [ 'BooksRole' ] }
    ];

    entity Authors as
        projection on my.Authors;

    entity Books as
        projection on my.Books;

    @cds.redirection.target : false
    @odata.draft.enabled
    entity BooksDraft as
        projection on my.Books;
}

annotate MyProject0711Service with @requires :
[
    'authenticated-user',
    'BooksRole'
];

MongoDBQueryFactory = class MongoDBQueryFactory {
  static mergeDBFilters(...filters) {
    let merge = {
      ['$and']: []
    };
    for (let filter of filters) {
      if (Object.keys(filter).length > 0)
        merge['$and'].push(filter);
    }
    return merge;
  }

  static createSearchFilter(searchTerms) {
  	if (Object.keys(searchTerms).length < 1)
      return {};
    if (Object.keys(searchTerms).length == 1)
      return {
        [Object.keys(searchTerms)[0]]: new RegExp('^' + searchTerms[Object.keys(searchTerms)[0]], 'i')
      };

    let filter = {
      ['$and']: []
    };
    for (let searchTerm in searchTerms) {
      filter['$and'].push({
        [searchTerm]: new RegExp('^' + searchTerms[searchTerm], 'i')
      });
    }
    return filter;
  }

  static createTimeFilter(date, days) {
    let filter = {
      createdAt: {
        $lt: MongoDBQueryFactory.getDateDayCeiling(date)
      }
    }
    if (days > 0) filter.createdAt['$gte'] = MongoDBQueryFactory.getDateDayCeiling(date, days);
    return filter;
  }

  static getDateDayCeiling(date, offset=0) {
    var d = new Date(date);
    d.setDate(d.getDate() + 1 - offset);
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d;
  }
}

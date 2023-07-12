using {MyProject0711} from '../db/schema';
using {pdm} from '../db/pdm-schema';
using from  '../db/data-privacy';
@requires: 'PersonalDataManager'
@path: 'service/pdm'
@PersonalDataManagerService: true
service PDMService {
  entity MyProject0711_Books as projection on MyProject0711.Books;
}
using {pdm} from './pdm-schema';
using {MyProject0711} from './schema';
annotate MyProject0711.Books with @PersonalData :{
  EntitySemantics: 'DataSubject',
  DataSubjectRole: 'Data Subject Role',
  DataSubjectRoleDescription: 'Data Subject Role'
}
{
  ID     @PersonalData.IsPotentiallyPersonal;
  ID     @PersonalData.FieldSemantics: 'DataSubjectID';
  title     @PersonalData.IsPotentiallyPersonal;
  stock     @PersonalData.IsPotentiallyPersonal;
  price     @PersonalData.IsPotentiallySensitive;
  currency     @PersonalData.IsPotentiallyPersonal;
}
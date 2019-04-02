import { RepoBranchDto } from './repo.branch.dto';
import { RepoBranchesDataObjectInterface } from '../interfaces/repo-branches-data.object.interface';

export class RepoBranchesObjectDto implements RepoBranchesDataObjectInterface {
  master?: RepoBranchDto;
  development?: RepoBranchDto;
}

import AddColumn from './AddColumn/AddColumn';
import Filters from './Filters/Filters';
import FindAndReplace from './FindAndReplace/FindAndReplace';
import RemoveColumns from './RemoveColumns/RemoveColumns';
import RenameColumn from './RenameColumn/RenameColumn';
import ReorderColumn from './ReorderColumns/ReorderColumns';
import BaseModal from './BaseModal/BaseModal';

const modals: {[name: string]:typeof BaseModal} = {
	AddColumn, Filters, FindAndReplace, RemoveColumns, RenameColumn, ReorderColumn,
}
export default modals;

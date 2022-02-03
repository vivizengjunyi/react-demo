import { useEffect, useState, useRef, useCallback } from "react"
import 'materialize-css/dist/css/materialize.css';
import './styles.css'
import Modal from '../../components/modal'
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from 'reselect'
import {fetchTypicodePosts} from '../../fetch/typicode'
const columns = [
  { field: 'title', headerName: 'Title' },
  { field: 'body', headerName: 'Body' },
  { field: 'userId', headerName: 'User Id', width: '100px' },
  { headerName: 'Actions', width: '200px' },
]
const listSelector = createSelector(
  state => state.datalist.list,
  state => state.datalist.filteredUserId,
  (list, filteredUserId) => {
    return filteredUserId ? list.filter(item => item.userId === filteredUserId): list
  }
);
export default function DataList() {
  const dispatch = useDispatch();
  const editItem = useSelector(state => state.datalist.editItem);
  const orderField = useSelector(state => state.datalist.orderField);
  const orderType = useSelector(state => state.datalist.orderType);
  const all = useSelector(state => state.datalist.list);
  const list = useSelector(listSelector);
  if(orderField){
    list.sort((a, b) => {
      if(orderType === 'asc'){
        return a[orderField] > b[orderField] ? 1 : -1;
      }else{
        return a[orderField] < b[orderField] ? 1 : -1;
      }
    })
  }
  const editItemRef = useRef(null);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [modalProps, setModalProps] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  editItemRef.current = editItem;
  useEffect(() => {
    dispatch(fetchTypicodePosts());
  }, []);
  useEffect(() => {
    setTotal(list.length);
    var elems = document.querySelectorAll('select');
    var instances = window.M.FormSelect.init(elems, {});
  }, [list])
  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  }
  const nextPage = () => {
    if (page < total / pageSize - 1) {
      setPage(page + 1);
    }
  }
  const createOrEdit = () => {
    const editItem = editItemRef.current || {};
    if(isNaN(editItem.userId - 0)){
      window.M.toast({html: 'User id should be a number!', classes: 'rounded'});
      return false;
    }
    editItem.userId = editItem.userId - 0;
    if(editItem.id){
      const updatedData = list.map(item => {
        if (item.id === editItem.id) {
          return { ...editItem };
        } else {
          return item;
        }
      })
      dispatch({
        type: 'datalist/fetched',
        payload: updatedData
      })
    }else{
      dispatch({
        type: 'datalist/create',
        payload: { ...editItem, id: list.length + 1 }
      })
    }
    return true;
  }
  const deleteItem = (id) => {
    dispatch({
      type: 'datalist/delete',
      payload: id
    })
    
    window.M.toast({html: 'Record is deleted!', classes: 'rounded'});
  }
  const create = () => {
    setShowModal(true);
    setCloseModal(false);
    updateEditData();
    setModalProps({
      title: 'Create',
      onClose: () => {
        setShowModal(false);
      },
      onSubmit: (e) => {
        if(createOrEdit()){
          setCloseModal(true);
        }
      }
    });
  }
  const updateEditData = (data) => {
    dispatch({
      type: 'datalist/setEditItem',
      payload: data
    })
  };
  const edit = (item) => {
    setShowModal(true);
    setCloseModal(false);
    const editData = { ...item };
    updateEditData(editData);
    setModalProps({
      title: 'Edit',
      onClose: () => {
        setShowModal(false);
      },
      onSubmit: (e) => {
        if(createOrEdit()){
          setCloseModal(true);
        }
      },
      
    });
  }
  const setFilterUserId = (userId) => {
    dispatch({
      type: 'datalist/filteredUserId',
      payload: userId ? userId - 0 : null
    })
  }
  const sortByField = (field) => {
    dispatch({
      type: 'datalist/setOrderField',
      payload: field
    })
  }
  const currentPageRows = list.slice(page * pageSize, (page + 1) * pageSize);
  const userIds = Array.from(new Set(all.map(item => item.userId)));
  return <div>
    <div className="row">
      <div class="input-field col s12 m6">
        <select onChange={(e) => setFilterUserId(e.target.value)}>
          <option value="" selected>Choose your option</option>
          {
            userIds.map(userId => {
              return <option value={userId}>{userId}</option>
            })
          }
        </select>
        <label>Filter by user id</label>
      </div>
    </div>
    {
      showModal && <Modal {...modalProps} showModal={showModal} closeModal={closeModal}>
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input id="title" type="text" value={editItem.title} onChange={e => updateEditData({ title: e.target.value })} />
                <label for="title" class="active">Title</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <textarea id="body" class="materialize-textarea active" onChange={e => updateEditData({ body: e.target.value })} value={editItem.body}></textarea>
                <label for="body" class="active">Body</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="userId" type="text" className="validate" value={editItem.userId} onChange={e => updateEditData({ userId: e.target.value })} />
                <label for="userId" class="active">User Id</label>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    }
    {
      currentPageRows.length > 0 && <table className="datalist-table">
        <thead>
          <tr>
            {
              columns.map(column => <td key={column.field} style={{ width: column.width || 'auto' }}  onClick={() => column.field && sortByField(column.field)}>{column.headerName}</td>)
            }
          </tr>
        </thead>
        <tbody>
          {currentPageRows.map((row) => (
            <tr key={row.id}>
              {
                columns.map(column => column.field ? <td key={column.field}>
                  <div className="text-overflow" >
                    {row[column.field]}
                  </div>
                </td> : null)
              }
              <td key="actions" className="actions">
                <button className="btn" onClick={() => deleteItem(row.id)}>Delete</button>
                <button className="btn" onClick={() => edit(row)}>Edit</button>
              </td>
            </tr>
          ))}

        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4}>
              <div className="footer">
                <div>
                  <button className="btn" onClick={create}>Create</button>
                </div>
                <div className="pagination">
                  {pageSize * page} - {pageSize * (page + 1)} of {total}
                  <button className="btn" onClick={prevPage} disabled={page === 0}>Prev</button>
                  <button className="btn" onClick={nextPage} disabled={pageSize * (page + 1) >= total}>Next</button>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    }
  </div>
}
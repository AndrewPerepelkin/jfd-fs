import React, {useEffect, useState} from 'react';
import {paginate} from '../../../utils/paginate';
import Pagination from '../../common/pagination';
import SearchStatus from '../../ui/searchStatus';
import GroupList from '../../common/groupList';
import UsersTable from '../../ui/usersTable';
import _ from 'lodash';
import PropTypes from 'prop-types';
import TextField from '../../common/form/textField';
import {useSelector} from 'react-redux';
import {
  getProfessions,
  getProfessionsLoadingStatus
} from '../../../store/professions';
import {getCurrentUserId, getUsersList} from '../../../store/users';

const UsersListPage = () => {
  const users = useSelector(getUsersList());
  const currentUserId = useSelector(getCurrentUserId());

  const professions = useSelector(getProfessions());
  const professionsLoading = useSelector(getProfessionsLoadingStatus());
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState(null);
  const [sortBy, setSortBy] = useState({path: 'name', order: 'asc'});
  const [searchValue, setSearchValue] = useState('');

  const handleProfessionSelect = (item) => setSelectedProf(item);
  const handlePageChange = (pageIndex) => setCurrentPage(pageIndex);
  const handleProfessionReset = () => setSelectedProf(null);
  const handleOnSort = (item) => setSortBy(item);
  const handleSearch = (e) => setSearchValue(e.target.value);

  const handleToggleBookMark = (id) => {
    // setUsers(
    //   users.map((user) =>
    //     user._id === id ? {...user, bookmark: !user.bookmark} : user
    //   )
    // );
    console.log(id);
  };

  useEffect(() => {
    setCurrentPage(1);
    setSearchValue('');
  }, [selectedProf]);

  const handleToggleInputSearch = () => {
    setSelectedProf(null);
  };

  if (users) {
    const filterUsers = (data) => {
      let filteredUsers = data;
      if (searchValue) {
        filteredUsers = data.filter((user) => {
          const regExp = new RegExp(searchValue, 'gmi');
          return user.name.match(regExp);
        });
      }
      if (selectedProf !== null) {
        filteredUsers = data.filter(
          (user) => user.profession === selectedProf._id
        );
      }
      return filteredUsers.filter((user) => user._id !== currentUserId);
    };

    const filteredUsers = filterUsers(users);

    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);

    // if (professionsLoading) return 'loading...';
    return (
      <>
        <div className='d-flex'>
          {professions && !professionsLoading && (
            <div className='d-flex flex-column flex-shrink-0 p-3'>
              <GroupList
                selectedItem={selectedProf}
                items={professions}
                onItemSelect={handleProfessionSelect}
              />
              <button
                className='btn btn-secondary mt-2'
                onClick={handleProfessionReset}
              >
                Сброс фильтра
              </button>
            </div>
          )}
          <div className='d-flex flex-column'>
            <SearchStatus length={count} />
            <TextField
              placeholder={'Поиск...'}
              value={searchValue}
              onInput={handleSearch}
              onFocus={handleToggleInputSearch}
            />
            {!!count && (
              <UsersTable
                users={usersCrop}
                onSort={handleOnSort}
                selectedSort={sortBy}
                onToggleBookMark={handleToggleBookMark}
              />
            )}
            <div className='d-flex justify-content-center'>
              <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
  return 'loading...';
};

UsersListPage.propTypes = {
  users: PropTypes.array
};

export default UsersListPage;

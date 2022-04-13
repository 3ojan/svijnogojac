import React, { useEffect, useState } from 'react'
import Sidebar from "../../Sidebar/Sidebar";
import { connect, useSelector } from 'react-redux';
import { getUsers } from '../../store/actions/userAction';
import { getAdds } from '../../store/actions/articleAction';
import UserTable from '../../Tables/UserTable';
// components

function Users(props) {

  const users = useSelector(state => {
    return state.users.users
  });

  const ads = useSelector(state => {
    return state.articlesState.ads
  });

  const [filteredUsers, setFilteredUsers] = useState(null)

  useEffect(() => {
    if (!users) {
      props.getUsers();
    } else {
      setItems()
    }
  }, [users]);


  useEffect(() => {
    if (!ads) {
      props.getAdds();
    } else {
      setItems()
    }
  }, [ads]);

  const setItems = () => {
    if (ads && users) {
      const adsByUsers = {};
      const arrayOfAds = []
      users.map(user => {
        ads.map(ad => {
          if (!adsByUsers[user._id]) {
            adsByUsers[user._id] = {};
            adsByUsers[user._id].user = user;
            adsByUsers[user._id].ads = [];
          }
          if (ad.ownerId === user._id) {
            adsByUsers[user._id].ads.push(ad)
          }
        })
        let entryDate = 0;
        if (adsByUsers[user._id].ads.length > 0) {
          entryDate = adsByUsers[user._id].ads[adsByUsers[user._id].ads.length - 1].entryDate
        }
        arrayOfAds.push({
          user: user,
          total: adsByUsers[user._id].ads.length,
          date: entryDate
        })
      })
      console.log(adsByUsers)
      console.log(arrayOfAds)
      setFilteredUsers(arrayOfAds)
    }
  }


  return (
    <>
      <Sidebar></Sidebar>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <div className="profile-wrapper">
            {/* <section className="pb-20 relative block">
              <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
                <div className="flex flex-wrap text-center justify-center">
                  <div className="w-full lg:w-6/12 px-4">
                    <h2 className="text-4xl font-semibold text-white">
                      <br />
                    </h2>
                    <p className="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
                    </p>
                  </div>
                </div>

              </div>
            </section> */}
            {filteredUsers && <UserTable data={filteredUsers} title={"Članovi"}></UserTable>}
          </div>
        </div>
      </div >
    </>
  );
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps, { getUsers, getAdds })(Users)
import React, { useEffect, useState } from 'react'
import Sidebar from "../../Sidebar/Sidebar";
import { connect, useSelector } from 'react-redux';
import { getUserAds } from '../../store/actions/userAction';
import UserTable from '../../Tables/UserTable';
import { useNavigate, useParams } from 'react-router';
import CardTable from '../../Tables/CardTable';
// components

function UserAds(props) {

  const params = useParams();
  window.params = params;

  const ads = useSelector(state => {
    return state.articlesState.ads
  });

  const [userAds, setUserAds] = useState(null)

  useEffect(() => {
    const callback = (response) => {
      setUserAds(response);
    }
    props.getUserAds(params.id, callback);
  }, []);

  console.log(userAds)


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
            {/* {filteredUsers && <UserTable data={filteredUsers} title={"Članovi"}></UserTable>} */}
            {userAds && <CardTable title="Svi oglasi člana" color={"dark"} data={userAds}></CardTable>}
          </div>
        </div>
      </div >
    </>
  );
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps, { getUserAds })(UserAds)
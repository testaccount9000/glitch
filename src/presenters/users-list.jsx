import React from 'react';
import PropTypes from 'prop-types';

export const PopulatedUsersList = ({users, extraClass="" }) => (
  <div className={`users ${extraClass}`}>
    { users.map((user, key) => (
      <UserTile key={key} {...user}></UserTile>
    ))}
  </div>
);

PopulatedUsersList.propTypes = {
  users: PropTypes.array.isRequired,
  extraClass: PropTypes.string,
};

const UserTile = ({
  userLink,
  tooltipName, 
  style,
  alt, 
  userAvatarUrl,
  extraClass="",
}) => (
  <a className={`user ${extraClass}`} href={userLink} data-tooltip={tooltipName} data-tooltip-left="true" style={style}>
    <img width="32px" height="32px" src={userAvatarUrl} alt={alt}/>
  </a>
);

UserTile.propTypes = {
  userLink: PropTypes.string,
  tooltipName: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
  alt: PropTypes.string.isRequired,
  userAvatarUrl: PropTypes.string.isRequired,
  extraClass: PropTypes.string,
};
  
const GlitchTeamUsersList = () => {
  const glitchTeamAvatar = "https://cdn.gomix.com/2bdfb3f8-05ef-4035-a06e-2043962a3a13%2Fglitch-team-avatar.svg?1489266029267";
  
  const user = {
    userLink: null,
    tooltipName: "Glitch-Team",
    style: {backgroundColor:"#74ecfc"},
    alt: "Glitch Team Avatar",
    userAvatarUrl: glitchTeamAvatar,
    extraClass: "made-by-glitch",
  };
  
  return (
    <PopulatedUsersList users={[user]}></PopulatedUsersList>
  );
};

const UsersList = ({glitchTeam=false, users, extraClass}) => {
  if(glitchTeam) {
    return <GlitchTeamUsersList/>; 
  }
  return <PopulatedUsersList users={users} extraClass={extraClass}/>;
};

UsersList.propTypes = {
  glitchTeam: PropTypes.bool,
};

export default UsersList;
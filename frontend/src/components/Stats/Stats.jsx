import React, { useEffect, useState } from 'react';
import './Stats.css'
import {useGetUserStatsQuery } from "../../redux/features/user/userApi"
import {useGetDonationsStatsQuery} from "../../redux/features/donation/donationApi"
import {useGetProjectsStatsQuery} from "../../redux/features/project/projectApi"
const Stats = () => {
  const { data:Users } = useGetUserStatsQuery();
    const totalUserStats = Users?.totalUsers || 0;
    const { data:Donations} = useGetDonationsStatsQuery();
    const totalDonationsStats = Donations?.totalDonations || 0;
    const { data:Projects, error, isLoading} = useGetProjectsStatsQuery();
    const totalProjectsStats = Projects?.totalProjects || 0;
    
    

  // const [stats, setStats] = useState({
  //   users: 0,
  //   donations: 0,
  //   projects: 0
  // });   
  // State to hold lengths of donations, projects, and users

  // useEffect(() => {
    // Fetch users, donations, and projects from different endpoints
    // const fetchUsers = async () => {
    //   try {
    //     const response = await fetch('http://localhost:5000/users');
    //     const data = await response.json();
    //     setStats((prevStats) => ({ ...prevStats, users: data.length }));
    //   } catch (error) {
    //     console.error('Error fetching users:', error);
    //   }
    // };

    // const fetchDonations = async () => {
    //   try {
    //     const response = await fetch('http://localhost:5000/donations');
    //     const data = await response.json();
    //     setStats((prevStats) => ({ ...prevStats, donations: data.length }));
    //   } catch (error) {
    //     console.error('Error fetching donations:', error);
    //   }
    // };

    // const fetchProjects = async () => {
    //   try {
    //     const response = await fetch('http://localhost:5000/projects');
    //     const data = await response.json();
    //     setStats((prevStats) => ({ ...prevStats, projects: data.length }));
    //   } catch (error) {
    //     console.error('Error fetching projects:', error);
    //   }
    // };

    // Call all fetch functions
    // fetchUsers();
    // fetchDonations();
    // fetchProjects();
  // }, []);

  return (
    <section className="stats-section" id="stats">
      <div className="stat">
        <div className="stat-info">
          <div className="icon"><i className="fas fa-user"></i></div>
          <h3 className="label">Total Users</h3>
        </div>
        <h4 className="value">
          <span>{totalUserStats}</span>
          <span className="percent"><sup>/</sup></span>
        </h4>
      </div>
      <div className="stat">
        <div className="stat-info">
          <div className="icon"><i className="fas fa-hand-holding-usd"></i></div>
          <h3 className="label">Total Donations</h3>
        </div>
        <h4 className="value">
          <span>
            {totalDonationsStats}
            </span>
            <span className="percent"><sup>/</sup></span>
        </h4>
      </div>
      <div className="stat">
        <div className="stat-info">
          <div className="icon"><i className="fas fa-pencil-alt"></i></div>
          <h3 className="label">Total Projects</h3>
        </div>
        <h4 className="value">
          <span>
         {totalProjectsStats}
            </span>
            <span className="percent"><sup>/</sup></span>
        </h4>
      </div>
    </section>
  );
};

export default Stats;

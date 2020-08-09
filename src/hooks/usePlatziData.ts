// Dependencies
import { useState, useEffect } from 'react';
import axios from 'axios';

type Career = {
  id: number;
  title: string;
  logo: string;
  golden_achievement: string;
  diploma_link: string;
  active: boolean;
};

type Course = {
  id: number;
  title: string;
  badge: string;
  url: string;
  career: string;
  diploma_link: string;
};

type ReturnType = {
  loading: boolean;
  careers: Array<Career>;
  courses: Array<Course>;
};

export default (): ReturnType => {
  // States
  const [loading, setLoading] = useState(true);
  const [careers, setCareers] = useState([]);
  const [courses, setCourses] = useState([]);

  // Effects
  useEffect(() => {
    getDataFromPlatzi();
  }, []);

  // Functions
  const getDataFromPlatzi = async () => {
    try {
      await axios
        .get(`https://platzi-user-api.jecsham.com/api/v1/getUserSummary/@danestves`)
        .then(res => {
          setCareers(res.data.userData.careers);
          setCourses(res.data.userData.courses);
          setLoading(false);
        })
        .catch(err => console.error(err));
    } catch (error) {
      console.error(error);
    }
  };

  // Return
  return { loading, careers, courses };
};

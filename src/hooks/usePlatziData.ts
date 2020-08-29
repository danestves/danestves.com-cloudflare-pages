// Dependencies
import { useState, useEffect } from 'react';
import axios from 'axios';

// Types
import { ICareer, ICourse } from '../types';

type ReturnType = {
  loading: boolean;
  careers: Array<ICareer>;
  courses: Array<ICourse>;
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

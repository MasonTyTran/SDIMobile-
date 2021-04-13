import {showMessage} from 'react-native-flash-message';
import {useUser} from '@hooks';
import {WODataSource, WOProject} from '@data';
import React from 'react';
import moment from 'moment';

export function useTaskInfo(project: WOProject) {
  const user = useUser();
  const [loading, setLoading] = React.useState(false);
  const [startDate, setStartDate] = React.useState(
    new Date(project.vidagis_startdate),
  );
  const [endDate, setEndDate] = React.useState(
    new Date(project.vidagis_enddate),
  );
  const [person, setPerson] = React.useState(project.leader_name);
  const [completedTime, setCompletedTime] = React.useState(
    project.vidagis_project_total_time,
  );

  const previous = () => {
    setLoading(true);
    WODataSource.moveToNextStep({
      organization_id: user.organizationID,
      project_dateend: moment(endDate).format('DD/MM/yyyy'),
      project_datestart: moment(startDate).format('DD/MM/yyyy'),
      project_id: project.vidagis_project_id,
      total_time: completedTime,
      user_id: user.id,
    }).subscribe({
      next: (res) => {
        console.log(res);
        if (res.Code !== 0) {
          return showMessage({message: 'Thất bại', type: 'warning'});
        }
        showMessage({message: 'Thành công', type: 'success'});
      },
      error: () => {
        showMessage({message: 'Thất bại', type: 'warning'});
      },
      complete: () => setLoading(false),
    });
  };
  const forward = () => {
    setLoading(true);
    WODataSource.moveToPreviousStep({
      organization_id: user.organizationID,
      project_dateend: moment(endDate).format('DD/MM/yyyy'),
      project_datestart: moment(startDate).format('DD/MM/yyyy'),
      project_id: project.vidagis_project_id,
      total_time: completedTime,
      user_id: user.id,
    }).subscribe({
      next: (res) => {
        console.log(res);
        if (res.Code !== 0) {
          return showMessage({message: 'Thất bại', type: 'warning'});
        }
        showMessage({message: 'Thành công', type: 'success'});
      },
      error: () => {
        showMessage({message: 'Thất bại', type: 'warning'});
      },
      complete: () => setLoading(false),
    });
  };
  const complete = () => {
    setLoading(true);
    WODataSource.complete({
      organization_id: user.organizationID,
      project_end_time: moment(endDate).format('DD/MM/yyyy'),
      project_id: project.vidagis_project_id,
      total_time: completedTime,
      user_id: user.id,
    }).subscribe({
      next: (res) => {
        if (res.Code !== 0) {
          return showMessage({message: 'Thất bại', type: 'warning'});
        }
        showMessage({message: 'Thành công', type: 'success'});
      },
      error: () => {
        showMessage({message: 'Thất bại', type: 'warning'});
      },
      complete: () => setLoading(false),
    });
  };

  return {
    setStartDate,
    setEndDate,
    setCompletedTime,
    setPerson,
    person,
    completedTime,
    startDate,
    endDate,
    loading,
    previous,
    complete,
    forward,
  };
}

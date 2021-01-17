import {showMessage} from 'react-native-flash-message';
import {useUser} from '@hooks';
import {WODataSource, WOProject} from '@data';
import React from 'react';

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
    WODataSource.moveToPreviousStep({
      organization_id: user.organizationID,
      project_dateend: endDate.toISOString(),
      project_datestart: startDate.toISOString(),
      project_id: project.vidagis_project_id,
      total_time: completedTime,
      user_id: user.id,
    }).subscribe({
      next: () => {
        showMessage({message: 'Thành công', type: 'success'});
        setLoading(false);
      },
      error: () => {
        showMessage({message: 'Thất bại', type: 'warning'});
        setLoading(false);
      },
    });
  };
  const complete = () => {
    setLoading(true);
    WODataSource.complete({
      organization_id: user.organizationID,
      project_end_time: endDate.toISOString(),
      project_id: project.vidagis_project_id,
      total_time: completedTime,
      user_id: user.id,
    }).subscribe({
      next: () => {
        showMessage({message: 'Thành công', type: 'success'});
        setLoading(false);
      },
      error: () => {
        showMessage({message: 'Thất bại', type: 'warning'});
        setLoading(false);
      },
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
  };
}

import React, { Component, Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Header } from './Layouts';
import Jobs from './Jobs';
import { types, jobs } from '../store.js';
import 'typeface-roboto';

export default class extends Component {
  state = {
    jobs,
    job: {}
  };

  getJobsbyType() {
    return Object.entries(
      this.state.jobs.reduce((jobs, job) => {
        const { types } = job;

        jobs[types] = jobs[types] ? [...jobs[types], job] : [job];

        return jobs;
      }, {})
    );
  }

  handleCategorySelect = category => {
    this.setState({
      category
    });
  };

  handleJobSelect = id => {
    this.setState(({ jobs }) => ({
      job: jobs.find(jb => jb.id === id)
    }));
  };

  handleJobCreate = job => {
    this.setState(({ jobs }) => ({
      jobs: [...jobs, job]
    }));
  };

  render() {
    const jobs = this.getJobsbyType(),
      { category, job } = this.state;

    return (
      <Fragment>
        <CssBaseline />
        <Header
          types={types}
          category={category}
          onJobCreate={this.handleJobCreate}
          onSelect={this.handleCategorySelect}
        />

        <Jobs
          job={job}
          jobs={jobs}
          category={category}
          onSelect={this.handleJobSelect}
        />
      </Fragment>
    );
  }
}

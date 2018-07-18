import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar'
import CellItem from "../CellItem.jsx";
import localizer from 'react-big-calendar/lib/localizers/moment'
import moment from 'moment';
localizer(moment)

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			records: [],
			selectedDepto: "ADMI",
			events: []
		}
	}

	componentDidMount() {
	}

	_searchDepartment(depto) {
		fetch("https://registroapps.uniandes.edu.co/oferta_cursos/api/get_courses.php?term=201820&ptrm=1&prefix=" + depto + "&campus=&attr=&attrs=",{
			method: 'GET',
		}).then((ans) => {
			return ans.json();
		}).then((json) => {
			console.log(json);
			this.setState({
				records: json.records
			});
		});
	}

	_renderDeptos() {
		let deptos = ["ADMI","ANTR","ARQU","ARTE","AUTO","BIOL","CBCO","CBCA","CBPC","CIDE","CPOL","CISO","CONT","DECA","DEPO","DERE","DCOM","INTL","DISE","DADM","DDER","DLIT","ECON","EDUC","EPID","EGOB","DMIN","DEMP","DIGS","DENI","EECO","EINT","FARH","FILO","FISI","GEOC","GTEL","GPUB","HIST","HART","IELE","IING","IBIO","ICYA","ISIS","IIND","IMEC","IQUI","LEGI","LENG","LITE","DPUB","MGAP","MGAD","BCOM","DGGJ","DPRO","ARTI","MGPD","HDIG","MINE","MPET","MIIA","MPCU","PSCL","MIAD","MISO","MSIN","MBIT","MART","DEIN","EMAT","MADM","MPAZ","MDER","DEPR","MDIS","MECA","EDUI","MECU","MFIN","MGEO","MHAR","MLIT","MMER","MPER","MTRI","MSCM","MIFI","DEPI","MATE","MBAE","MEDI","MBIO","MUSI","PERI","SPUB","CBIO","PSIC","QUIM","RJUR","SICO","ESIO","STRA"];
		return deptos.map((d) => {
			return <option value={d} key={d}>{d}</option>
		});
	}

	_searchDepto() {
		this._searchDepartment(this.state.selectedDepto);
	}

	_renderClasses() {
		return this.state.records.map((d) => {
			return <CellItem key={d.nrc} class={d} _onSelectedClass={this._onSelectedClass.bind(this)}/>
		});
	}

	_handleChangeSelect(e) {
		e.preventDefault();
		let value = e.target.value;
		this.setState({
			selectedDepto: value
		})
	}

	_onSelectedClass(selectedClass) {
		var events = this.state.events.slice();
		for(var i = 0; i < selectedClass.schedules.length; i++) {
			let currentSchedule = selectedClass.schedules[i];
			if(currentSchedule.time_ini && currentSchedule.time_fin) {
				let startHour = parseInt(currentSchedule.time_ini.substring(0,2));
				let startMinutes = parseInt(currentSchedule.time_ini.substring(2,4));
				let endHour = parseInt(currentSchedule.time_fin.substring(0,2));
				let endMinutes = parseInt(currentSchedule.time_fin.substring(2,4));

				let days = this._getClassDays(currentSchedule);
				for(var j = 0; j < days.length; j++) {
					let currentDay = days[j];
					let newClass = {
						id: selectedClass.nrc,
						title: selectedClass.title,
						start: new Date(currentDay.year(), currentDay.month(),currentDay.date(), startHour, startMinutes, 0, 0),
						end: new Date(currentDay.year(), currentDay.month(), currentDay.date(), endHour, endMinutes, 0, 0),
						desc: selectedClass.title
					};
					events.push(newClass);
				}
			}
		}
		this.setState({
			events: events
		});
	}

	_getClassDays(schedule) {
		var days = [];
		if(schedule.D != null) {
			days.push(moment().isoWeekday(7));
		}
		if(schedule.S != null) {
			days.push(moment().isoWeekday(6));
		}
		if(schedule.V != null) {
			days.push(moment().isoWeekday(5));
		}
		if(schedule.J != null) {
			days.push(moment().isoWeekday(4));
		}
		if(schedule.I != null) {
			days.push(moment().isoWeekday(3));
		}
		if(schedule.M != null) {
			days.push(moment().isoWeekday(2));
		}
		if(schedule.L != null) {
			days.push(moment().isoWeekday(1));
		}
		return days;
	}

	render() {
		return (
			<div>
				<div className="col-md-3 side">
					<div className="left-upper">
						<select className="left-select" onChange={this._handleChangeSelect.bind(this)}>
							{this._renderDeptos()}
						</select>
						<input className="left-filter" type="text" placeholder="Name"/>
						<button className="left-search" onClick={this._searchDepto.bind(this)}>Search</button>
					</div>
					<div className="left-lower">
						{this._renderClasses()}
					</div>
				</div>
				<div className="col-md-9 app">
					<div className="calendarApp">
						<BigCalendar
							selectable
							events={this.state.events}
							defaultView={BigCalendar.Views.MONTH}
							defaultDate={new Date()}
							onSelectEvent={event => alert(event.title)}
							onSelectSlot={slotInfo =>
									alert(
										`selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
										`\nend: ${slotInfo.end.toLocaleString()}` +
										`\naction: ${slotInfo.action}`
									)
							}
						/>	
					</div>
				</div>
			</div>
		);
	}
}

export default Home;

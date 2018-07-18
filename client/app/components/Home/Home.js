import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar'
import events from './events'
import localizer from 'react-big-calendar/lib/localizers/moment'
import moment from 'moment';
localizer(moment)

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			records: []
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

	render() {
		return (
			<div>
				<div className="col-md-3 side">
					<div className="left-upper">
						<select className="left-select">
							{this._renderDeptos()}
						</select>
					</div>
					<div className="left-lower">
					</div>
				</div>
				<div className="col-md-9 app">
					<div className="calendarApp">
						<BigCalendar
							selectable
							events={events}
							defaultView={BigCalendar.Views.MONTH}
							scrollToTime={new Date(1970, 1, 1, 6)}
							defaultDate={new Date(2015, 3, 12)}
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

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
		this.searchDepartment("ISIS");
	}

	searchDepartment(depto) {
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

	render() {
		return (
			<div>
				<div className="col-md-2 side">
				</div>
				<div className="col-md-10 app">
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

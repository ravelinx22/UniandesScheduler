import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar'
import events from './events'
import localizer from 'react-big-calendar/lib/localizers/moment'
import moment from 'moment';
localizer(moment)

class Home extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	render() {
		return (
			<div className="app">
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
		);
	}
}

export default Home;

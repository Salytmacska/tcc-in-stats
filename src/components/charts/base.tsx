import gamesData from '../../data/games.json';
import draftsData from '../../data/drafts.json';
import { Fragment, useState } from 'react';
import Chart from './chart';
import MapPickChart from './map-pick-chart';
import CivPickChart from './civ-pick-chart';
import CivBanChart from './civ-ban-chart';
import CivPlayChart from './civ-play-chart';
import CivWinChart from './civ-win-chart';
import styles from './base.module.css';
import GameTimeChart from './game-time-chart';
import MapPlayChart from './map-play-chart';

export default function Base(): JSX.Element {
    const [filter, setFilter] = useState(null);
    (window as any).setFilter = setFilter;
    let filteredGamesData = gamesData;
    let filteredDraftsData = draftsData;
    if (filter != null) {
        filteredGamesData = gamesData.filter((game) => filter.brackets.includes(game.bracket) && filter.maps.includes(game.map) && filter.stages.includes(game.stage));
        filteredDraftsData = {
            civDrafts: draftsData.civDrafts.filter(draft => filter.brackets.includes(draft.bracket) && filter.stages.includes(draft.stage)),
            mapDrafts: draftsData.mapDrafts.filter(draft => filter.brackets.includes(draft.bracket) && filter.stages.includes(draft.stage)),
        };
    }
    const isFilterApplied = gamesData.length !== filteredGamesData.length;
    return (
        <Fragment>
            <sup className={styles.attributions}>Thanks to Beargwyn for compiling all the data.</sup>
            <p>Welcome to the "T90 Community Cup in Stats" website. This website collects all the statistics you could ever want to know about the tournament in one place!</p>
            <p>The data, by default summarizes the entire tournament (as of 2024.06.25). Use the filters on the toolbar to view the data pertaining to a particular group, map or bracket.</p>
            <p>So let's jump in with the most encompassing stats first:</p>
            {isFilterApplied ?
                <p>There were <span className={styles['highlighted-text']}>{filteredDraftsData.mapDrafts.length}</span> sets played over the course of the tournmament, that match the selected filters.</p> :
                <p>There were <span className={styles['highlighted-text']}>{filteredDraftsData.mapDrafts.length}</span> sets played over the course of the tournmament.</p>
            }
            {isFilterApplied ?
                <p>Looking at individual games, there were <span className={styles['highlighted-text']}>{filteredGamesData.length}</span> games played over the course of the tournmament, that match the selected filters.</p> :
                <p>Looking at individual games, there were <span className={styles['highlighted-text']}>{filteredGamesData.length}</span> games played over the course of the tournmament.</p>
            }
            <h2>Drafts data</h2>
            <p>The following charts summarize the data gathered from the drafts.</p>
            <p>This chart is showing the number of times each map was picked during a draft. Note that any map not picked was banned so no separate chart for that.</p>
            <MapPickChart draftsData={filteredDraftsData} filter={filter}></MapPickChart>
            <p>Next up is civilization picks in the drafts specifically.</p>
            <CivPickChart draftsData={filteredDraftsData} filter={filter}></CivPickChart>
            <p>Finally civilization bans.</p>
            <CivBanChart draftsData={filteredDraftsData} filter={filter}></CivBanChart>
            <h2>Games data</h2>
            <p>So we know which maps were picked in the drafts. But which ones were actually played?</p>
            <MapPlayChart gamesData={filteredGamesData.filter(game => game.map != null)} filter={filter}></MapPlayChart>
            <p>The next chart shows the number of times a civilization was played. If you are curious about a specific map, or ELO range, then use the filters accessible using the filter button on the top-right.</p>
            <CivPlayChart gamesData={filteredGamesData.filter(game => game.map != null)} filter={filter}></CivPlayChart>
            <p>Which civ is the best? Below is the win rate chart. Hover each column to get the important additional context of the number of games played.</p>
            <CivWinChart gamesData={filteredGamesData.filter(game => game.map != null)} filter={filter}></CivWinChart>
            <p>How long each game was? Let's see on the next graph!</p>
            <GameTimeChart gamesData={filteredGamesData.filter(game => game.map != null)} filter={filter}></GameTimeChart>
            <hr></hr>
            Thanks for checking out T90 Community Cup in Stats!
        </Fragment>
    );
}
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
            <p>Welcome to the "Hidden Community Cup in Stats" website. This website collects all the statistics you could ever want to know about the tournament in one place!</p>
            <p>The data, by default summarizes the entire tournament. Use the filters on the toolbar to view the data pertaining to a particular group, map or bracket.</p>
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
            <MapPickChart draftsData={filteredDraftsData}></MapPickChart>
            <p>Next up is civilization picks in the drafts specifically.</p>
            <CivPickChart draftsData={filteredDraftsData}></CivPickChart>
            <p>Finally civilization bans.</p>
            <CivBanChart draftsData={filteredDraftsData}></CivBanChart>
            <h2>Games data</h2>
            <p>The next chart shows the number of times a civilization was played. If you are curious about a specific map, or ELO range, then use the filters accessible using the filter button on the top-right.</p>
            <CivPlayChart gamesData={filteredGamesData.filter(game => game.map != null)}></CivPlayChart>
            <p>And finally the big question. Which civ is the best? Below is the win rate chart. Hover each column to get the important additional context of the number of games played.</p>
            <CivWinChart gamesData={filteredGamesData.filter(game => game.map != null)}></CivWinChart>
            <hr></hr>
            Thanks for checking out Hidden Community Cup in Stats. Below are some small footnotes regarding some edge cases in the data:
            <ul>
                <li>
                    noah vs. spacekinch (Alexios Komnenos - Group B) Game 1 seems to be missing. The game is included in the games total, but not in any of the individual charts.
                </li>
                <li>
                    dodo3011 vs. sizzlinfajita (Jan Zizka - Group A) Had 3 games, all of them seems to be lost. The games are included in the games total, and the drafts are included in the set charts. But the individual game charts are missing these 3 games. 
                </li>
            </ul>
        </Fragment>
    );
}
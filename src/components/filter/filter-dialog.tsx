import { useState } from 'react';
import styles from './filter-dialog.module.css'
import FilterMapItem from './filter-map-item';
import {pull, uniq, merge, cloneDeep} from 'lodash-es';
import FilterBracketItem from './filter-bracket-item';
import FilterStageItem from './filter-stage-item';
import useBaseUrl from '@docusaurus/useBaseUrl';

export type Filter = {
    maps: string[],
    brackets: string[],
    stages: string[],
    appliedFilters: {
        any: boolean,
        stages: boolean,
        brackets: boolean,
        maps: boolean,
    },
};

export default function FilterDialog(): JSX.Element {
    const onClickHandler = (isApplied) => {
        const dialog = document.getElementById('filter-dialog') as HTMLDialogElement;
        if (isApplied && typeof (window as any).setFilter === 'function') {
            (window as any).setFilter(filter);   
        }
        dialog.close();
    };
    const defaultFilter: Filter = {
        maps: [
            'TCC African Reed Beds', 'TCC Coast to Mountain', 'TCC Fortified Clearing',
            'TCC Fractal', 'TCC Golden Lakes', 'TCC Llanganati',
            'TCC Outcrop', 'TCC Ring of Reeds', 'TCC Spiral',
        ],
        brackets: [
            'Champion', 'Monks', 'Mangonels', 'Knights', 'Light Cavs', 'Pikemen',
            'Longswords', 'Crossbows', 'Skirms', 'Spearmen', 'Archers', 'Militia',
        ],
        stages: [
            'Group A', 'Group B', 'Group C', 'Group D', 'Quarter Final', 'Semi Final', 'Final',
        ],
        appliedFilters: {
            any: false,
            stages: false,
            brackets: false,
            maps: false,
        },
    };
    const [filter, setFilter] = useState(cloneDeep(defaultFilter));
    const onMapFilterChange = (mapname, value) => {
        const newSelectedMaps = value === false ? pull(filter.maps, mapname) : uniq(filter.maps.concat(mapname));
        setFilter(merge({}, filter, {
            maps: newSelectedMaps,
            appliedFilters: {
                maps: newSelectedMaps.length != defaultFilter.maps.length,
                any: filter.appliedFilters.stages || filter.appliedFilters.brackets || newSelectedMaps.length != defaultFilter.maps.length,
            },
        }));
    };
    const onBracketFilterChange = (bracketName, value) => {
        const newSelectedBrackets = value === false ? pull(filter.brackets, bracketName) : uniq(filter.brackets.concat(bracketName));
        setFilter(merge({}, filter, {
            brackets: newSelectedBrackets,
            appliedFilters: {
                brackets: newSelectedBrackets.length != defaultFilter.brackets.length,
                any: filter.appliedFilters.stages || newSelectedBrackets.length != defaultFilter.brackets.length || filter.appliedFilters.maps,
            },
        }));
    };
    const onStageFilterChange = (stageName, value) => {
        const newSelectedStages = value === false ? pull(filter.stages, stageName) : uniq(filter.stages.concat(stageName));
        setFilter(merge({}, filter, {
            stages: newSelectedStages,
            appliedFilters: {
                stages: newSelectedStages.length != defaultFilter.stages.length,
                any: newSelectedStages.length != defaultFilter.stages.length || filter.appliedFilters.brackets || filter.appliedFilters.maps,
            },
        }));
    };

    return (
        <dialog id="filter-dialog" className={styles['dialog']}>
            <h2>Maps</h2>
            <div className={styles['map-container']}>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/TheHipOs_AoE2Map.png')}
                    value={filter.maps.includes('TCC African Reed Beds')}
                    onChange={onMapFilterChange.bind(this, 'TCC African Reed Beds')}
                    name="African Reed Beds">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/Coast_to_Mountains_AoE2_Map.png')}
                    value={filter.maps.includes('TCC Coast to Mountain')}
                    onChange={onMapFilterChange.bind(this, 'TCC Coast to Mountain')}
                    name="Coast to Mountain">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/Fortified_Clearing_AoE2_map.png')}
                    value={filter.maps.includes('TCC Fortified Clearing')}
                    onChange={onMapFilterChange.bind(this, 'TCC Fortified Clearing')}
                    name="Fortified Clearing">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/Fractal_AoE2_map.png')}
                    value={filter.maps.includes('TCC Fractal')}
                    onChange={onMapFilterChange.bind(this, 'TCC Fractal')}
                    name="Fractal">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/Golden_Lakes_Map.png')}
                    value={filter.maps.includes('TCC Golden Lakes')}
                    onChange={onMapFilterChange.bind(this, 'TCC Golden Lakes')}
                    name="Golden Lakes">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/463px-Llanganati_AoE2_Map.webp.png')}
                    value={filter.maps.includes('TCC Llanganati')}
                    onChange={onMapFilterChange.bind(this, 'TCC Llanganati')}
                    name="Llanganati">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/Outcrop_AoE2_map.png')}
                    value={filter.maps.includes('TCC Outcrop')}
                    onChange={onMapFilterChange.bind(this, 'TCC Outcrop')}
                    name="Outcrop">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/Ring_of_Reeds_AoE2_map.png')}
                    value={filter.maps.includes('TCC Ring of Reeds')}
                    onChange={onMapFilterChange.bind(this, 'TCC Ring of Reeds')}
                    name="Ring of Reeds">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/Spiral_AoE2_map.png')}
                    value={filter.maps.includes('TCC Spiral')}
                    onChange={onMapFilterChange.bind(this, 'TCC Spiral')}
                    name="Spiral">
                </FilterMapItem>
            </div>
            <hr/>
            <h2>Brackets</h2>
            <div className={styles['map-container']}>
                <FilterBracketItem
                    imageSrc={useBaseUrl('/img/brackets/Champion.webp')}
                    value={filter.brackets.includes('Champion')}
                    onChange={onBracketFilterChange.bind(this, 'Champion')}
                    name={"Champion"}>
                </FilterBracketItem>
                <FilterBracketItem
                    imageSrc={useBaseUrl('/img/brackets/Monk.webp')}
                    value={filter.brackets.includes('Monks')}
                    onChange={onBracketFilterChange.bind(this, 'Monks')}
                    name={"Monks"}>
                </FilterBracketItem>
                <FilterBracketItem
                    imageSrc={useBaseUrl('/img/brackets/Mangonel.webp')}
                    value={filter.brackets.includes('Mangonels')}
                    onChange={onBracketFilterChange.bind(this, 'Mangonels')}
                    name={"Mangonels"}>
                </FilterBracketItem>
                <FilterBracketItem
                    imageSrc={useBaseUrl('/img/brackets/Knight.webp')}
                    value={filter.brackets.includes('Knights')}
                    onChange={onBracketFilterChange.bind(this, 'Knights')}
                    name={"Knights"}>
                </FilterBracketItem>
                <FilterBracketItem
                    imageSrc={useBaseUrl('/img/brackets/Lightcavalry.webp')}
                    value={filter.brackets.includes('Light Cavs')}
                    onChange={onBracketFilterChange.bind(this, 'Light Cavs')}
                    name={"Light Cavs"}>
                </FilterBracketItem>
                <FilterBracketItem
                    imageSrc={useBaseUrl('/img/brackets/Pikeman.webp')}
                    value={filter.brackets.includes('Pikemen')}
                    onChange={onBracketFilterChange.bind(this, 'Pikemen')}
                    name={"Pikemen"}>
                </FilterBracketItem>
                <FilterBracketItem
                    imageSrc={useBaseUrl('/img/brackets/Longswordsman.webp')}
                    value={filter.brackets.includes('Longswords')}
                    onChange={onBracketFilterChange.bind(this, 'Longswords')}
                    name={"Longswords"}>
                </FilterBracketItem>
                <FilterBracketItem
                    imageSrc={useBaseUrl('/img/brackets/Crossbowman.webp')}
                    value={filter.brackets.includes('Crossbows')}
                    onChange={onBracketFilterChange.bind(this, 'Crossbows')}
                    name={"Crossbows"}>
                </FilterBracketItem>
                <FilterBracketItem
                    imageSrc={useBaseUrl('/img/brackets/Skirmisher.webp')}
                    value={filter.brackets.includes('Skirms')}
                    onChange={onBracketFilterChange.bind(this, 'Skirms')}
                    name={"Skirms"}>
                </FilterBracketItem>
                <FilterBracketItem
                    imageSrc={useBaseUrl('/img/brackets/Spearman.webp')}
                    value={filter.brackets.includes('Spearmen')}
                    onChange={onBracketFilterChange.bind(this, 'Spearmen')}
                    name={"Spearmen"}>
                </FilterBracketItem>
                <FilterBracketItem
                    imageSrc={useBaseUrl('/img/brackets/Archers.webp')}
                    value={filter.brackets.includes('Archers')}
                    onChange={onBracketFilterChange.bind(this, 'Archers')}
                    name={"Archers"}>
                </FilterBracketItem>
                <FilterBracketItem
                    imageSrc={useBaseUrl('/img/brackets/Militia.webp')}
                    value={filter.brackets.includes('Militia')}
                    onChange={onBracketFilterChange.bind(this, 'Militia')}
                    name={"Militia"}>
                </FilterBracketItem>
            </div>
            <hr/>
            <h2>Stages</h2>
            <div className={styles['map-container']}>
                <FilterStageItem
                    value={filter.stages.includes('Group A')}
                    onChange={onStageFilterChange.bind(this, 'Group A')}
                    name="Group A">
                </FilterStageItem>
                <FilterStageItem
                    value={filter.stages.includes('Group B')}
                    onChange={onStageFilterChange.bind(this, 'Group B')}
                    name="Group B">
                </FilterStageItem>
                <FilterStageItem
                    value={filter.stages.includes('Group C')}
                    onChange={onStageFilterChange.bind(this, 'Group C')}
                    name="Group C">
                </FilterStageItem>
                <FilterStageItem
                    value={filter.stages.includes('Group D')}
                    onChange={onStageFilterChange.bind(this, 'Group D')}
                    name="Group D">
                </FilterStageItem>
                <FilterStageItem
                    value={filter.stages.includes('Quarter Final')}
                    onChange={onStageFilterChange.bind(this, 'Quarter Final')}
                    name="Quarterfinals">
                </FilterStageItem>
                <FilterStageItem
                    value={filter.stages.includes('Semi Final')}
                    onChange={onStageFilterChange.bind(this, 'Semi Final')}
                    name="Semifinals">
                </FilterStageItem>
                <FilterStageItem
                    value={filter.stages.includes('Final')}
                    onChange={onStageFilterChange.bind(this, 'Final')}
                    name="Finals">
                </FilterStageItem>
            </div>
            <hr/>
            <div className={styles['action-container']}>
                <button onClick={onClickHandler.bind(this, true)} className={`${styles['action-btn']}`}>APPLY FILTERS</button>
                <button onClick={onClickHandler.bind(this, false)} className={`${styles['action-btn']}`}>CANCEL</button>
            </div>
        </dialog>
    );
}
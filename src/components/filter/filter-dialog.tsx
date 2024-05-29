import { useState } from 'react';
import styles from './filter-dialog.module.css'
import FilterMapItem from './filter-map-item';
import {pull, uniq} from 'lodash-es';
import FilterBracketItem from './filter-bracket-item';
import FilterStageItem from './filter-stage-item';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function FilterDialog(): JSX.Element {
    const onClickHandler = (isApplied) => {
        const dialog = document.getElementById('filter-dialog') as HTMLDialogElement;
        if (isApplied && typeof (window as any).setFilter === 'function') {
            (window as any).setFilter(filter);   
        }
        dialog.close();
    };
    const [filter, setFilter] = useState({
        maps: [
            'HC5 Arabia v3', 'HC5 Bay v5', 'HC5 Bypass v1', 'HC5 Cross v2', 'HC5 Cup v2', 'HC5 Evacuation v2', 'HC5 Gold Rush v2',
            'HC5 Hidden Forts v2', 'HC5 High Tides v2', 'HC5 Islands v3', 'HC5 Mudflow v1', 'HC5 Quarry v4', 'HC5 Slopes v3',
        ],
        brackets: [
            'Vasco Da Gama', 'Alexios Komnenos', 'Khosrau', 'Gajah Mada', 'Otto The Great', 'King Stephen',
            'Jan Zizka', 'Sumanguru', 'Gregory VII', 'Selim the Grim', 'Alfred the Alpaca', 'Jean Bureau',
        ],
        stages: [
            'Group A', 'Group B', 'Group C', 'Group D', 'Quarter Final', 'Semi Final', 'Final',
        ],
    });
    const onMapFilterChange = (mapname, value) => {
        if (value === false) {
            setFilter({
                ...filter,
                maps: pull(filter.maps, mapname),
            });
        } else {
            setFilter({
                ...filter,
                maps: uniq(filter.maps.concat(mapname)),
            });
        }
    };
    const onBracketFilterChange = (bracketName, value) => {
        if (value === false) {
            setFilter({
                ...filter,
                brackets: pull(filter.brackets, bracketName),
            });
        } else {
            setFilter({
                ...filter,
                brackets: uniq(filter.brackets.concat(bracketName)),
            });
        }
    };
    const onStageFilterChange = (stageName, value) => {
        if (value === false) {
            setFilter({
                ...filter,
                stages: pull(filter.stages, stageName),
            });
        } else {
            setFilter({
                ...filter,
                stages: uniq(filter.stages.concat(stageName)),
            });
        }
    };

    return (
        <dialog id="filter-dialog" className={styles['dialog']}>
            <h2>Maps</h2>
            <div className={styles['map-container']}>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/300px-Arabia_AoE2DE.png')}
                    value={filter.maps.includes('HC5 Arabia v3')}
                    onChange={onMapFilterChange.bind(this, 'HC5 Arabia v3')}
                    name="ARABIA">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/300px-Bay_AoE2DE.png')}
                    value={filter.maps.includes('HC5 Bay v5')}
                    onChange={onMapFilterChange.bind(this, 'HC5 Bay v5')}
                    name="BAY">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/300px-Bypass_AoE2DE.png')}
                    value={filter.maps.includes('HC5 Bypass v1')}
                    onChange={onMapFilterChange.bind(this, 'HC5 Bypass v1')}
                    name="BYPASS">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/300px-Four_Lakes_AoE2_Map.png')}
                    value={filter.maps.includes('HC5 Cross v2')}
                    onChange={onMapFilterChange.bind(this, 'HC5 Cross v2')}
                    name="CROSS">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/300px-Cup_AoE2DE.png')}
                    value={filter.maps.includes('HC5 Cup v2')}
                    onChange={onMapFilterChange.bind(this, 'HC5 Cup v2')}
                    name="CUP">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/301px-Evacuation_AoE2DE.png')}
                    value={filter.maps.includes('HC5 Evacuation v2')}
                    onChange={onMapFilterChange.bind(this, 'HC5 Evacuation v2')}
                    name="EVACUATION">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/300px-Gold_Rush_AoE2_Map.png')}
                    value={filter.maps.includes('HC5 Gold Rush v2')}
                    onChange={onMapFilterChange.bind(this, 'HC5 Gold Rush v2')}
                    name="GOLD RUSH">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/301px-HiddenForts_AoE2DE.png')}
                    value={filter.maps.includes('HC5 Hidden Forts v2')}
                    onChange={onMapFilterChange.bind(this, 'HC5 Hidden Forts v2')}
                    name="HIDDEN FORTS">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/300px-High_Tides_AoE2DE.png')}
                    value={filter.maps.includes('HC5 High Tides v2')}
                    onChange={onMapFilterChange.bind(this, 'HC5 High Tides v2')}
                    name="HIGH TIDES">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/300px-Islands_Maps.png')}
                    value={filter.maps.includes('HC5 Islands v3')}
                    onChange={onMapFilterChange.bind(this, 'HC5 Islands v3')}
                    name="ISLANDS">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/300px-Mudflow.png')}
                    value={filter.maps.includes('HC5 Mudflow v1')}
                    onChange={onMapFilterChange.bind(this, 'HC5 Mudflow v1')}
                    name="MUDFLOW">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/300px-Quarry_AoE2DE.png')}
                    value={filter.maps.includes('HC5 Quarry v4')}
                    onChange={onMapFilterChange.bind(this, 'HC5 Quarry v4')}
                    name="QUARRY">
                </FilterMapItem>
                <FilterMapItem
                    imageSrc={useBaseUrl('/img/maps/300px-Slopes_AoE2DE.png')}
                    value={filter.maps.includes('HC5 Slopes v3')}
                    onChange={onMapFilterChange.bind(this, 'HC5 Slopes v3')}
                    name="SLOPES">
                </FilterMapItem>
            </div>
            <hr/>
            <h2>Brackets</h2>
            <div className={styles['map-container']}>
                <FilterBracketItem
                    imageSrc={useBaseUrl('/img/heroes/Vasco da Gama.png')}
                    value={filter.brackets.includes('Vasco Da Gama')}
                    onChange={onBracketFilterChange.bind(this, 'Vasco Da Gama')}
                    name={"Vasco\nda Gama"}>
                </FilterBracketItem>
                <FilterBracketItem
                    imageSrc={useBaseUrl('/img/heroes/Alexios Komnenos.png')}
                    value={filter.brackets.includes('Alexios Komnenos')}
                    onChange={onBracketFilterChange.bind(this, 'Alexios Komnenos')}
                    name={"Alexios\nKomnenos"}>
                </FilterBracketItem>
                <FilterBracketItem
                    imageSrc={useBaseUrl('/img/heroes/Khosrau.png')}
                    value={filter.brackets.includes('Khosrau')}
                    onChange={onBracketFilterChange.bind(this, 'Khosrau')}
                    name={"Khosrau\n "}>
                </FilterBracketItem>
                <FilterBracketItem
                    imageSrc={useBaseUrl('/img/heroes/Gajah Mada.png')}
                    value={filter.brackets.includes('Gajah Mada')}
                    onChange={onBracketFilterChange.bind(this, 'Gajah Mada')}
                    name={"Gajah Mada\n "}>
                </FilterBracketItem>
                <FilterBracketItem
                    imageSrc={useBaseUrl('/img/heroes/Otto the Great.png')}
                    value={filter.brackets.includes('Otto The Great')}
                    onChange={onBracketFilterChange.bind(this, 'Otto The Great')}
                    name={"Otto\nthe Great"}>
                </FilterBracketItem>
                <FilterBracketItem
                    imageSrc={useBaseUrl('/img/heroes/King Stephen.png')}
                    value={filter.brackets.includes('King Stephen')}
                    onChange={onBracketFilterChange.bind(this, 'King Stephen')}
                    name={"King Stephen\n "}>
                </FilterBracketItem>
                <FilterBracketItem
                    imageSrc={useBaseUrl('/img/heroes/Jan Zizka.png')}
                    value={filter.brackets.includes('Jan Zizka')}
                    onChange={onBracketFilterChange.bind(this, 'Jan Zizka')}
                    name={"Jan Zizka\n "}>
                </FilterBracketItem>
                <FilterBracketItem
                    imageSrc={useBaseUrl('/img/heroes/Sumanguru.png')}
                    value={filter.brackets.includes('Sumanguru')}
                    onChange={onBracketFilterChange.bind(this, 'Sumanguru')}
                    name={"Sumanguru\n "}>
                </FilterBracketItem>
                <FilterBracketItem
                    imageSrc={useBaseUrl('/img/heroes/Gregory VII.png')}
                    value={filter.brackets.includes('Gregory VII')}
                    onChange={onBracketFilterChange.bind(this, 'Gregory VII')}
                    name={"Gregory VII\n "}>
                </FilterBracketItem>
                <FilterBracketItem
                    imageSrc={useBaseUrl('/img/heroes/Selim the Grim.png')}
                    value={filter.brackets.includes('Selim the Grim')}
                    onChange={onBracketFilterChange.bind(this, 'Selim the Grim')}
                    name={"Selim\nthe Grim"}>
                </FilterBracketItem>
                <FilterBracketItem
                    imageSrc={useBaseUrl('/img/heroes/Alfred the Alpaca.png')}
                    value={filter.brackets.includes('Alfred the Alpaca')}
                    onChange={onBracketFilterChange.bind(this, 'Alfred the Alpaca')}
                    name={"Alfred\nthe Alpaca"}>
                </FilterBracketItem>
                <FilterBracketItem
                    imageSrc={useBaseUrl('/img/heroes/Jean Bureau.png')}
                    value={filter.brackets.includes('Jean Bureau')}
                    onChange={onBracketFilterChange.bind(this, 'Jean Bureau')}
                    name={"Jean Bureau\n "}>
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
                <button onClick={onClickHandler.bind(this, true)} className={`close ${styles['action-btn']}`}>APPLY FILTERS</button>
                <button onClick={onClickHandler.bind(this, false)} className={`close ${styles['action-btn']}`}>CANCEL</button>
            </div>
        </dialog>
    );
}
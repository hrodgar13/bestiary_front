import {Component, OnInit} from '@angular/core';
import {FormBuilder, UntypedFormGroup} from "@angular/forms"
import {CreatureService} from "./creature.service";
import {concatMap, of, switchMap, takeUntil} from "rxjs";
import {DestroySubscription} from "../../../../shared/helpers/destroy-subscribtion";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {Creature} from "../../../../shared/interfaces/creature/get/creature";
import {Attributes} from "../../../../shared/static/creature/attributes.code";
import {Attribute} from "../../../../shared/interfaces/creature/get/attribute";
import {CreateMeasure} from "../../../../shared/interfaces/creature/create/create-measure";
import {CreateCreature} from "../../../../shared/interfaces/creature/create/create-creature";
import {CreateActionAbility} from "../../../../shared/interfaces/creature/create/create-action-ability";
import {CreateAttribute} from "../../../../shared/interfaces/creature/create/create-attribute";
import {Measure} from "../../../../shared/interfaces/creature/get/measure";
import {ActionsAbilities} from "../../../../shared/interfaces/creature/get/actions-abilities";
import {ActionAbilities} from "../../../../shared/static/creature/action-abilities.code";
import {CreateTranslation} from "../../../../shared/interfaces/creature/create/create-translation";

@Component({
    selector: 'app-create-beast',
    templateUrl: './create-beast.component.html',
    styleUrls: ['./create-beast.component.scss']
})
export class CreateBeastComponent extends DestroySubscription implements OnInit {

    AttributesCodes = Attributes

    creatureId: null | number = null
    creaturePayload!: Creature

    attributes: number[] = []
    measures: CreateMeasure[] = []
    actionAbilities: CreateActionAbility[] = []

    creatureForm!: UntypedFormGroup;
    private isFinished = false;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly creatureService: CreatureService,
        private readonly matSnack: MatSnackBar,
        private route: ActivatedRoute,
        private router: Router
    ) {
        super()
    }

    ngOnInit(): void {

    }

    private getCreatureToUpdate() {
        if (this.creatureId) {
            this.creatureService.getCreatureById(this.creatureId).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
                this.creaturePayload = data

                this.attributes = this.convertAttributeInCreationType(data.attributes)
                this.measures = this.convertMeasureInCreationType(data.measures)
                this.actionAbilities = this.convertActionAbilitiesInCreationType(data.action_abilities)
            })
        }

        this.initForm()
    }

    private initForm() {
        this.creatureForm = this.formBuilder.group({
            name_en: [this.creaturePayload.name.en || null, []],
            name_ua: [this.creaturePayload.name.en || null],
            armor_class: [this.creaturePayload.armor_class || null],
            hits: [this.creaturePayload.hits || null],
            hits_in_dice: [this.creaturePayload.hits_in_dice || null],
            danger_lvl: [this.creaturePayload.danger_lvl || null],
            experience: [this.creaturePayload.experience || null],
            mastery_bonus: [this.creaturePayload.mastery_bonus || null],
            strength: [this.creaturePayload.stat_block.strength || null],
            dexterity: [this.creaturePayload.stat_block.strength || null],
            constitution: [this.creaturePayload.stat_block.strength || null],
            intelligence: [this.creaturePayload.stat_block.strength || null],
            wisdom: [this.creaturePayload.stat_block.strength || null],
            charisma: [this.creaturePayload.stat_block.strength || null],
            description_en: [this.creaturePayload.description.en || null],
            description_ua: [this.creaturePayload.description.ua || null],
            alignment: [this.defineSingleAttribute(this.creaturePayload, Attributes.alignment)],
            size: [this.defineSingleAttribute(this.creaturePayload, Attributes.size)],
            type: [this.defineSingleAttribute(this.creaturePayload, Attributes.type)],
        })
    }

    private sendForm() {
        if (this.creatureForm.invalid) {
            return
        }

        const creaturePayload: CreateCreature = {
            name: {
                id: this.creaturePayload.id,
                en: this.creatureForm.get('name_en')?.value,
                ua: this.creatureForm.get('name_ua')?.value,
            },
            isFinished: this.isFinished,
            armor_class: this.creatureForm.get('armor_class')?.value,
            hits: this.creatureForm.get('armor_class')?.value,
            hits_in_dice: this.creatureForm.get('armor_class')?.value,
            danger_lvl: this.creatureForm.get('armor_class')?.value,
            experience: this.creatureForm.get('armor_class')?.value,
            mastery_bonus: this.creatureForm.get('armor_class')?.value,
            stat_block: {
                id: this.creaturePayload.stat_block.id,
                strength: this.creatureForm.get('armor_class')?.value,
                dexterity: this.creatureForm.get('armor_class')?.value,
                constitution: this.creatureForm.get('armor_class')?.value,
                intelligence: this.creatureForm.get('armor_class')?.value,
                wisdom: this.creatureForm.get('armor_class')?.value,
                charisma: this.creatureForm.get('armor_class')?.value
            },
            measures: this.measures,
            attributes: this.attributes,
            action_abilities: this.actionAbilities,
            description: {
                en: this.creatureForm.get('description_en')?.value,
                ua: this.creatureForm.get('description_ua')?.value,
            }
        }

        this.creatureService.createCreature(creaturePayload).pipe(takeUntil(this.destroyStream$)).subscribe(data => {
            this.matSnack.open('saved', 'ok', {
                duration: 3000,
                verticalPosition: "top"
            })
        })
    }

    private defineSingleAttribute(creaturePayload: Creature, attr_cat: string): number | null {
        return this.creaturePayload.attributes.find(item => item.attr_cat === attr_cat)?.id || null
    }

    private convertAttributeInCreationType(attributes: Attribute[]): number[] {
        return attributes.map(attr => attr.id);
    }

    private convertMeasureInCreationType(measures: Measure[]): CreateMeasure[] {
        return measures.map(measure => {
            return {
                ...measure,
                attribute: this.convertAttributeInCreationType([measure.attribute])[0]
            }
        })
    }

    private convertActionAbilitiesInCreationType(action_abilities: ActionsAbilities[]): CreateActionAbility[] {
        const create_action_abilities: CreateActionAbility[] = []

        action_abilities.forEach(item => {
            create_action_abilities.push({
                id: item.id,
                actionType: item.action_type,
                description: item.description,
                title: item.title
            })
        });

        return create_action_abilities
    }
}

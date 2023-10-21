import {Component, OnInit} from '@angular/core';
import {FormBuilder, UntypedFormGroup} from "@angular/forms"
import {CreateCreatureInterface} from "../../../../shared/interfaces/creature/create-creature.interface";

@Component({
  selector: 'app-create-beast',
  templateUrl: './create-beast.component.html',
  styleUrls: ['./create-beast.component.scss']
})
export class CreateBeastComponent implements OnInit {
  creatureForm!: UntypedFormGroup;

  creature!: CreateCreatureInterface
  creatureStatBlock!: UntypedFormGroup
  creatureSpeeds!: UntypedFormGroup
  creatureSavingThrows!: UntypedFormGroup;
  creatureSkillModifier!: UntypedFormGroup;
  creatureFeelModifiers!: UntypedFormGroup;
  creatureCreateAbility!: UntypedFormGroup;
  creatureActions!: UntypedFormGroup;

  constructor(
    private readonly formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.creatureForm = this.formBuilder.group({
      creature_name_EN: [null],
      creature_name_UA: [null],
      creature_name_tag: [null],
      images: [null],
      creature_size: [null],
      creature_type: [null],
      creature_alignment: [null],
      armor_Class: [null],
      armor_type: [null],
      hit_points: [null],
      hit_points_by_dices: [null],
      creature_stat_block: [null],
      creature_vulnerability: [null],
      creature_resistance: [null],
      creature_immunity: [null],
      creature_statement_immunity: [null],
      creature_languages: [null],
      creature_danger_level: [null],
      creature_exp_amount: [null],
      creature_mastery_bonus: [null],
      creature_description_EN: [null],
      creature_description_UA: [null]
    })
    this.creatureSpeeds = this.formBuilder.group({
      speed_amount: [null],
      speed_name_id: [null]
    })
    this.creatureStatBlock = this.formBuilder.group({
      strength: [null],
      dexterity: [null],
      construction: [null],
      intelligence: [null],
      wisdom: [null],
      charisma: [null]
    })
    this.creatureSavingThrows = this.formBuilder.group({
      saving_throw_name_id: [null],
      modifier: [null]
    })
    this.creatureSkillModifier = this.formBuilder.group({
      skill_name_id: [null],
      modifier: [null]
    })
    this.creatureFeelModifiers = this.formBuilder.group({
      feel_modifier: [null],
      feel_measure_EN: [null],
      feel_measure_UA: [null],
      feel_id: [null]
    })
    this.creatureCreateAbility = this.formBuilder.group({
      title_EN: [null],
      title_UA: [null],
      ability_EN: [null],
      ability_UA: [null]
    })
    this.creatureActions = this.formBuilder.group({
      title_EN: [null],
      title_UA: [null],
      action_EN: [null],
      action_UA: [null]
    })
  }

  writeForm() {
    console.log(this.creatureForm.value)
  }
}

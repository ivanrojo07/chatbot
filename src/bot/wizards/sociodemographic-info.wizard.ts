import { On, Wizard, WizardStep, Context } from 'nestjs-telegraf';
import { AlcaldiasService } from 'src/alcaldias/alcaldias.service';
import { Gender } from 'src/common/enums/gender.enum';
import { SociodemographicService } from 'src/sociodemographic-info/sociodemographic.service';
import { Scenes } from 'telegraf';

@Wizard('sociodemographic-info-wizard')
export class SociodemographicInfoWizard {
  constructor(
    private readonly alcaldiasService: AlcaldiasService,
    private readonly sociodemographicService: SociodemographicService,
  ) {}
  // Paso 1 Mensaje Inicial
  @WizardStep(1)
  async step1(@Context() ctx: Scenes.WizardContext) {
    console.log(ctx.from);
    await ctx.reply(
      '¡Hola! Antes que nada, te comparto el aviso de privacidad: [enlace al aviso de privacidad]. ¿Deseas continuar? (sí/no)',
    );
    ctx.wizard.next();
  }

  @On('text')
  @WizardStep(2)
  async step2(@Context() ctx: Scenes.WizardContext) {
    if (ctx.message && 'text' in ctx.message) {
      const message = ctx.message;
      const response = message.text.toLowerCase();
      if (response === 'sí' || response === 'si') {
        await ctx.reply('¡Gracias por aceptar! ¿Cuál es tu edad?');
        ctx.wizard.next();
        return;
      } else {
        await ctx.reply(
          'Entiendo. Si cambias de opinión, siempre puedes iniciar el proceso nuevamente con el comando /start. ¡Hasta luego!',
        );
        return ctx.scene.leave();
      }
    }
    // Si mandó una foto o algo que no es texto:
    await ctx.reply('Por favor, envíame solo texto.');
  }

  @On('text')
  @WizardStep(3)
  async step3(@Context() ctx: Scenes.WizardContext) {
    if (ctx.message && 'text' in ctx.message) {
      const age = ctx.message.text;
      ctx.wizard.state['age'] = age;
      await ctx.reply(`¿Puedes indicarme tu género? 
        (1) Masculino
        (2) Femenino
        (3) Otro`);
      ctx.wizard.next();
      return;
    }
    // Si mandó una foto o algo que no es texto:
    await ctx.reply('Por favor, envíame solo texto.');
  }

  @On('text')
  @WizardStep(4)
  async step4(@Context() ctx: Scenes.WizardContext) {
    if (ctx.message && 'text' in ctx.message) {
      const gender = ctx.message.text;
      ctx.wizard.state['gender'] = gender;
      //  ALCALDIAS
      const alcaldias = await this.alcaldiasService.findAll();
      const alcaldiasList = alcaldias
        .map((a) => `(${a.id}) ${a.name}`)
        .join(', ');
      await ctx.reply(`¿Cuál es tu alcaldía de residencia?`);
      await ctx.reply(`Las alcaldías disponibles son: ${alcaldiasList}`);

      ctx.wizard.next();
      return;
    }
    // Si mandó una foto o algo que no es texto:
    await ctx.reply('Por favor, envíame solo texto.');
  }

  @On('text')
  @WizardStep(5)
  async step5(@Context() ctx: Scenes.WizardContext) {
    if (ctx.message && 'text' in ctx.message) {
      const alcaldia = ctx.message.text;
      ctx.wizard.state['alcaldia'] = alcaldia;
      ctx.wizard.state['chatId'] = ctx.from?.id.toString();
      console.log(ctx.wizard.state);
      await ctx.reply(`¡Gracias por proporcionar tu información!`);
      this.saveSocioDemographicInfo(ctx.wizard.state);
      return ctx.scene.leave();
    }
  }

  async saveSocioDemographicInfo(state: any) {
    // Aquí guardarías la información en la base de datos
    let gender = Gender.OTHER;
    switch (state.gender) {
      case '1':
        gender = Gender.MALE;
        break;
      case '2':
        gender = Gender.FEMALE;
        break;
      case '3':
        gender = Gender.OTHER;
        break;
      default:
        break;
    }
    const sociodemographicInfo = {
      age: parseInt(state.age, 10),
      gender: gender,
      alcaldiaId: parseInt(state.alcaldia, 10),
      chatId: state.chatId,
    };
    console.log(sociodemographicInfo);
    await this.sociodemographicService.create(sociodemographicInfo);
  }

  async failedReply(ctx: Scenes.WizardContext) {
    await ctx.reply(
      `Gracias por tu interes, te recomendamos llamar a locatel (*0311) o acude a los siguientes centros de atención:.`,
    );
    return ctx.scene.leave();
  }
}


const Alexa = require('ask-sdk-core');

const AddToCartIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AddToCartIntent';
    },
    handle(handlerInput) {
        const product = handlerInput.requestEnvelope.request.intent.slots.Product.value;
        const speakOutput = `Okay, I have added ${product} to your cart.`;
        return handlerInput.responseBuilder.speak(speakOutput).getResponse();
    }
};

const CompareProductsIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CompareProductsIntent';
    },
    handle(handlerInput) {
        const productOne = handlerInput.requestEnvelope.request.intent.slots.ProductOne.value;
        const productTwo = handlerInput.requestEnvelope.request.intent.slots.ProductTwo.value;
        const speakOutput = `Here's a comparison between ${productOne} and ${productTwo}.`;
        return handlerInput.responseBuilder.speak(speakOutput).getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say things like, add iPhone to my cart, or compare iPhone and Samsung.';
        return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return handlerInput.responseBuilder.speak(speakOutput).getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        return handlerInput.responseBuilder.speak(speakOutput).reprompt(speakOutput).getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        AddToCartIntentHandler,
        CompareProductsIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();

<template>
    <div class="context">
        <div class="graybox">
            <!-- 例子：Remembering_VVG (_( including_II forgetting_VVG )_) is_VBZ both_RR an_AT1 important_JJ cognitive_JJ process_NN1 and_CC a_AT1 pervasive_JJ linguistic_JJ phenomenon_NN1 ._. This_DD1 paper_NN1 focuses_VVZ on_II a_AT1 less_RRR researched_VVN phenomenon_NN1 in_II remembrance_NN1 ,_, namely_REX ,_, how_RRQ remembrance_NN1 can_VM be_VBI disputed_VVN by_II interlocutors_NN2 in_II conversation_NN1 ._. I_PPIS1 show_VV0 ,_, with_IW data_NN from_II audio_JJ video_NN1 -_- recorded_JJ Mandarin_NN1 conversations_NN2 ,_, that_CST disputed_VVD remembering_VVG in_II the_AT form_NN1 of_IO debating_NN1 ,_, augmentation_NN1 ,_, emendation_NN1 ,_, and_CC alternation_NN1 ,_, etc_RA ._. is_VBZ often_RR displayed_VVN in_II the_AT service_NN1 of_IO social_JJ interaction_NN1 ._. -->
            {{ par }}
        </div>
    </div>
</template>

<script>
export default {
    props: ["par"],
    data() {
        return {
            text: ''
        }
    },

}
</script>

<style scoped>
.graybox {
    background-color: rgba(231, 230, 230, 1);
    width: 100%;
    font-size: 1rem;
    line-height: 2rem;

}
</style>
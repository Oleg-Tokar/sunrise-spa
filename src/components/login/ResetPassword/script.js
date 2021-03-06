import { required, sameAs } from 'vuelidate/lib/validators';
import gql from 'graphql-tag';
import ServerError from '../../common/form/ServerError/index.vue';
import LoadingButton from '../../common/form/LoadingButton/index.vue';
import BaseInput from '../../common/form/BaseInput/index.vue';
import BaseForm from '../../common/form/BaseForm/index.vue';

export default {
  components: {
    BaseForm,
    BaseInput,
    LoadingButton,
    ServerError,
  },
  data: () => ({
    newPassword: null,
    confirmPassword: null,
  }),
  methods: {
    resetPassword() {
      const tokenValue = this.$route.params.token;
      return this.$apollo.mutate({
        mutation: gql`
          mutation resetPassword($tokenValue: String!, $newPassword: String!) {
            customerResetPassword(tokenValue: $tokenValue, newPassword: $newPassword) {
              firstName
            }
          }`,
        variables: {
          tokenValue,
          newPassword: this.newPassword,
        },
      });
    },
    getErrorMessage({ code }) {
      if (code === 'InvalidSubject') {
        return this.$t('invalidSubject');
      }
      return this.$t('unknownError');
    },
  },
  validations: {
    newPassword: { required },
    confirmPassword: { required, sameAsPassword: sameAs('newPassword') },
  },
};

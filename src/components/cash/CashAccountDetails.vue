<template>
  <div>

  <table class="table table-striped table-bordered w100p" id="cashDetailsTable">
    <thead>
      <tr>
        <th class="font-weight-bold">VALUE DATE</th>
        <th>DESCRIPTION</th>
        <th class="text-right">DEBIT({{currency}})</th>
        <th class="text-right">CREDIT({{currency}})</th>
        <th class="text-right">BALANCE({{currency}})</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in cashStatements" :key="index">
        <td>{{item.valueDate | moment("DD-MMM-YYYY") }} </td>
        <td>{{item.description}}</td>
        <td class="text-right">{{item.debitAmount | currency('',2)}}</td>
        <td class="text-right">{{item.creditAmount | currency('',2)}}</td>
        <td class="text-right">{{item.balance | currency('',2)}}</td>
      </tr>
    </tbody>
  </table>

  </div>
</template>

<script>
  export default
  {
    props: ['cashStatements', 'currency']
  }
</script>

<style  scoped lang="sass">
  #cashDetailsTable
    margin-bottom: 0px !important
    thead
      background: #4c7396
      tr
        height: 25px
        th
          color: #FFFFFF
          padding: 5px 5px !important
    tbody
      td
        padding: 5px 5px !important
        height: 25px
        color: #31708f
        font-size: 11px
</style>

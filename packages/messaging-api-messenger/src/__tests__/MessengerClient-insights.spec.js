import MockAdapter from 'axios-mock-adapter';

import MessengerClient from '../MessengerClient';

const ACCESS_TOKEN = '1234567890';

let axios;
let _create;
beforeEach(() => {
  axios = require('axios'); // eslint-disable-line global-require
  _create = axios.create;
});

afterEach(() => {
  axios.create = _create;
});

const createMock = () => {
  const client = new MessengerClient(ACCESS_TOKEN);
  const mock = new MockAdapter(client.axios);
  return { client, mock };
};

describe('Page Messaging Insights API', () => {
  describe('#getInsights', () => {
    it('should call api get Insight data', async () => {
      const { client, mock } = createMock();

      const reply = {
        data: [
          {
            name: 'page_messages_active_threads_unique',
          },
        ],
      };

      mock
        .onGet(
          `/me/insights/?metric=page_messages_active_threads_unique&access_token=${ACCESS_TOKEN}`
        )
        .reply(200, reply);

      const res = await client.getInsights([
        'page_messages_active_threads_unique',
      ]);

      expect(res).toEqual([
        {
          name: 'page_messages_active_threads_unique',
        },
      ]);
    });

    it('support multiple metrics', async () => {
      const { client, mock } = createMock();

      const reply = {
        data: [
          {
            name: 'page_messages_active_threads_unique',
          },
          {
            name: 'page_messages_blocked_conversations_unique',
          },
        ],
      };

      mock
        .onGet(
          `/me/insights/?metric=page_messages_active_threads_unique%2Cpage_messages_blocked_conversations_unique&access_token=${ACCESS_TOKEN}`
        )
        .reply(200, reply);

      const res = await client.getInsights([
        'page_messages_active_threads_unique',
        'page_messages_blocked_conversations_unique',
      ]);

      expect(res).toEqual([
        {
          name: 'page_messages_active_threads_unique',
        },
        {
          name: 'page_messages_blocked_conversations_unique',
        },
      ]);
    });
  });

  describe('#getActiveThreads', () => {
    it('should call api get Insight data', async () => {
      const { client, mock } = createMock();

      const reply = {
        data: [
          {
            name: 'page_messages_active_threads_unique',
            period: 'day',
            values: [
              {
                value: 83111,
                end_time: '2017-02-02T08:00:00+0000',
              },
              {
                value: 85215,
                end_time: '2017-02-03T08:00:00+0000',
              },
              {
                value: 87175,
                end_time: '2017-02-04T08:00:00+0000',
              },
            ],
            title: 'Daily unique active threads count by thread fbid',
            description:
              'Daily: total unique active threads created between users and page.',
            id:
              '1234567/insights/?metric=page_messages_active_threads_unique/day',
          },
        ],
      };

      mock
        .onGet(
          `/me/insights/?metric=page_messages_active_threads_unique&access_token=${ACCESS_TOKEN}`
        )
        .reply(200, reply);

      const res = await client.getActiveThreads();

      expect(res).toEqual({
        name: 'page_messages_active_threads_unique',
        period: 'day',
        values: [
          {
            value: 83111,
            end_time: '2017-02-02T08:00:00+0000',
          },
          {
            value: 85215,
            end_time: '2017-02-03T08:00:00+0000',
          },
          {
            value: 87175,
            end_time: '2017-02-04T08:00:00+0000',
          },
        ],
        title: 'Daily unique active threads count by thread fbid',
        description:
          'Daily: total unique active threads created between users and page.',
        id: '1234567/insights/?metric=page_messages_active_threads_unique/day',
      });
    });
  });

  describe('#getBlockedConversations', () => {
    it('should call api get Insight data', async () => {
      const { client, mock } = createMock();

      const reply = {
        data: [
          {
            name: 'page_messages_blocked_conversations_unique',
            period: 'day',
            values: [
              {
                value: 83111,
                end_time: '2017-02-02T08:00:00+0000',
              },
              {
                value: 85215,
                end_time: '2017-02-03T08:00:00+0000',
              },
              {
                value: 87175,
                end_time: '2017-02-04T08:00:00+0000',
              },
            ],
            title: 'Daily unique blocked conversations count',
            description:
              'Daily: The number of conversations with the Page that have been blocked.',
            id:
              '1234567/insights/?metric=page_messages_blocked_conversations_unique/day',
          },
        ],
      };

      mock
        .onGet(
          `/me/insights/?metric=page_messages_blocked_conversations_unique&access_token=${ACCESS_TOKEN}`
        )
        .reply(200, reply);

      const res = await client.getBlockedConversations();

      expect(res).toEqual({
        name: 'page_messages_blocked_conversations_unique',
        period: 'day',
        values: [
          {
            value: 83111,
            end_time: '2017-02-02T08:00:00+0000',
          },
          {
            value: 85215,
            end_time: '2017-02-03T08:00:00+0000',
          },
          {
            value: 87175,
            end_time: '2017-02-04T08:00:00+0000',
          },
        ],
        title: 'Daily unique blocked conversations count',
        description:
          'Daily: The number of conversations with the Page that have been blocked.',
        id:
          '1234567/insights/?metric=page_messages_blocked_conversations_unique/day',
      });
    });
  });

  describe('#getReportedConversations', () => {
    it('should call api get Insight data', async () => {
      const { client, mock } = createMock();

      const reply = {
        data: [
          {
            name: 'page_messages_reported_conversations_unique',
            period: 'day',
            values: [
              {
                value: 83111,
                end_time: '2017-02-02T08:00:00+0000',
              },
              {
                value: 85215,
                end_time: '2017-02-03T08:00:00+0000',
              },
              {
                value: 87175,
                end_time: '2017-02-04T08:00:00+0000',
              },
            ],
            title: 'Daily unique reported conversations count',
            description:
              'Daily: The number of conversations from your Page that have been reported by people for reasons such as spam, or containing inappropriate content.',
            id:
              '1234567/insights/?metric=page_messages_reported_conversations_unique/day',
          },
        ],
      };

      mock
        .onGet(
          `/me/insights/?metric=page_messages_reported_conversations_unique&access_token=${ACCESS_TOKEN}`
        )
        .reply(200, reply);

      const res = await client.getReportedConversations();

      expect(res).toEqual({
        name: 'page_messages_reported_conversations_unique',
        period: 'day',
        values: [
          {
            value: 83111,
            end_time: '2017-02-02T08:00:00+0000',
          },
          {
            value: 85215,
            end_time: '2017-02-03T08:00:00+0000',
          },
          {
            value: 87175,
            end_time: '2017-02-04T08:00:00+0000',
          },
        ],
        title: 'Daily unique reported conversations count',
        description:
          'Daily: The number of conversations from your Page that have been reported by people for reasons such as spam, or containing inappropriate content.',
        id:
          '1234567/insights/?metric=page_messages_reported_conversations_unique/day',
      });
    });
  });

  describe('#getReportedConversationsByReportType', () => {
    it('should call api get Insight data', async () => {
      const { client, mock } = createMock();

      const reply = {
        data: [
          {
            name: 'page_messages_reported_conversations_by_report_type_unique',
            period: 'day',
            values: [
              {
                value: {
                  spam: 0,
                  inappropriate: 0,
                  other: 0,
                },
                end_time: '2018-03-11T08:00:00+0000',
              },
              {
                value: {
                  spam: 0,
                  inappropriate: 0,
                  other: 0,
                },
                end_time: '2018-03-12T07:00:00+0000',
              },
            ],
            title:
              'Daily unique reported conversations count broken down by report type',
            description:
              'Daily: The number of conversations from your Page that have been reported by people for reasons such as spam, or containing inappropriate content broken down by report type.',
            id:
              '1234567/insights/?metric=page_messages_reported_conversations_by_report_type_unique/day',
          },
        ],
      };

      mock
        .onGet(
          `/me/insights/?metric=page_messages_reported_conversations_by_report_type_unique&access_token=${ACCESS_TOKEN}`
        )
        .reply(200, reply);

      const res = await client.getReportedConversationsByReportType();

      expect(res).toEqual({
        name: 'page_messages_reported_conversations_by_report_type_unique',
        period: 'day',
        values: [
          {
            value: {
              spam: 0,
              inappropriate: 0,
              other: 0,
            },
            end_time: '2018-03-11T08:00:00+0000',
          },
          {
            value: {
              spam: 0,
              inappropriate: 0,
              other: 0,
            },
            end_time: '2018-03-12T07:00:00+0000',
          },
        ],
        title:
          'Daily unique reported conversations count broken down by report type',
        description:
          'Daily: The number of conversations from your Page that have been reported by people for reasons such as spam, or containing inappropriate content broken down by report type.',
        id:
          '1234567/insights/?metric=page_messages_reported_conversations_by_report_type_unique/day',
      });
    });
  });

  describe('#getOpenConversations', () => {
    it('should call api get Insight data', async () => {
      const { client, mock } = createMock();

      const reply = {
        data: [
          {
            name: 'page_messages_open_conversations_unique',
            period: 'day',
            values: [
              { value: 1000, end_time: '2018-03-12T07:00:00+0000' },
              { value: 1000, end_time: '2018-03-13T07:00:00+0000' },
            ],
            title: 'Daily unique open conversations count',
            description:
              'Daily: The total number of open conversations between your Page and people in Messenger. This metric excludes blocked conversations.',
            id:
              '1386473101668063/insights/page_messages_open_conversations_unique/day',
          },
        ],
      };

      mock
        .onGet(
          `/me/insights/?metric=page_messages_open_conversations_unique&access_token=${ACCESS_TOKEN}`
        )
        .reply(200, reply);

      const res = await client.getOpenConversations();

      expect(res).toEqual({
        name: 'page_messages_open_conversations_unique',
        period: 'day',
        values: [
          { value: 1000, end_time: '2018-03-12T07:00:00+0000' },
          { value: 1000, end_time: '2018-03-13T07:00:00+0000' },
        ],
        title: 'Daily unique open conversations count',
        description:
          'Daily: The total number of open conversations between your Page and people in Messenger. This metric excludes blocked conversations.',
        id:
          '1386473101668063/insights/page_messages_open_conversations_unique/day',
      });
    });
  });

  describe('#getNewConversations', () => {
    it('should call api get Insight data', async () => {
      const { client, mock } = createMock();

      const reply = {
        data: [
          {
            name: 'page_messages_new_conversations_unique',
            period: 'day',
            values: [
              { value: 1, end_time: '2018-03-12T07:00:00+0000' },
              { value: 0, end_time: '2018-03-13T07:00:00+0000' },
            ],
            title: 'Daily unique new conversations count',
            description:
              'Daily: The number of messaging conversations on Facebook Messenger that began with people who had never messaged with your business before.',
            id:
              '1386473101668063/insights/page_messages_new_conversations_unique/day',
          },
        ],
      };

      mock
        .onGet(
          `/me/insights/?metric=page_messages_new_conversations_unique&access_token=${ACCESS_TOKEN}`
        )
        .reply(200, reply);

      const res = await client.getNewConversations();

      expect(res).toEqual({
        name: 'page_messages_new_conversations_unique',
        period: 'day',
        values: [
          { value: 1, end_time: '2018-03-12T07:00:00+0000' },
          { value: 0, end_time: '2018-03-13T07:00:00+0000' },
        ],
        title: 'Daily unique new conversations count',
        description:
          'Daily: The number of messaging conversations on Facebook Messenger that began with people who had never messaged with your business before.',
        id:
          '1386473101668063/insights/page_messages_new_conversations_unique/day',
      });
    });
  });
});
